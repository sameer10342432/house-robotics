<?php
/**
 * HOUSE ROBOTICS — Secure File Upload Manager
 */

require_once __DIR__ . '/Database.php';

class Upload {
    private static array $allowedMimes = [
        'image/jpeg'      => 'jpg',
        'image/png'       => 'png',
        'image/webp'      => 'webp',
        'image/gif'       => 'gif',
        'image/svg+xml'   => 'svg',
        'application/pdf' => 'pdf'
    ];

    private static array $dangerousExtensions = [
        'php', 'php3', 'php4', 'php5', 'php7', 'php8', 'phtml', 'phar',
        'pl', 'py', 'cgi', 'sh', 'bash', 'exe', 'bat', 'cmd', 'vbs',
        'js', 'jsp', 'asp', 'aspx', 'htm', 'html', 'shtml', 'htaccess', 'ini'
    ];

    /**
     * Process uploaded file(s) safely
     */
    public static function process(array $file, array $metadata = [], string $uploader = 'Admin'): array {
        if (!isset($file['error']) || is_array($file['error'])) {
            throw new Exception('Invalid upload parameter format.');
        }

        switch ($file['error']) {
            case UPLOAD_ERR_OK:
                break;
            case UPLOAD_ERR_NO_FILE:
                throw new Exception('No file was submitted for upload.');
            case UPLOAD_ERR_INI_SIZE:
            case UPLOAD_ERR_FORM_SIZE:
                throw new Exception('Uploaded file exceeds maximum allowed size.');
            default:
                throw new Exception('Failed to receive file upload on server.');
        }

        // 1. File size validation (10MB maximum)
        $maxSize = 10 * 1024 * 1024;
        if ($file['size'] > $maxSize) {
            throw new Exception('File size exceeds the 10MB limit.');
        }

        // 2. MIME type verification using FileInfo extension
        $finfo = new finfo(FILEINFO_MIME_TYPE);
        $mime = $finfo->file($file['tmp_name']);

        if (!array_key_exists($mime, self::$allowedMimes)) {
            throw new Exception("Invalid file type ({$mime}). Only JPG, PNG, WEBP, GIF, SVG, and PDF files are permitted.");
        }

        // 3. Extension check & sanitization
        $originalName = basename($file['name']);
        $rawExt = strtolower(pathinfo($originalName, PATHINFO_EXTENSION));

        if (in_array($rawExt, self::$dangerousExtensions, true)) {
            throw new Exception("The file extension .{$rawExt} is prohibited for security reasons.");
        }

        $canonicalExt = self::$allowedMimes[$mime];
        $safeNameBase = preg_replace('/[^a-zA-Z0-9_-]/', '_', pathinfo($originalName, PATHINFO_FILENAME));
        if (empty($safeNameBase)) {
            $safeNameBase = 'media';
        }

        // 4. Generate unique filename
        $uniqueFilename = sprintf('%s-%s-%s.%s', $safeNameBase, date('YmdHis'), bin2hex(random_bytes(4)), $canonicalExt);

        // 5. Ensure upload directory exists
        $uploadDir = __DIR__ . '/../uploads';
        if (!is_dir($uploadDir)) {
            @mkdir($uploadDir, 0755, true);
        }

        // Protect upload directory with .htaccess if not already present
        $uploadHtaccess = $uploadDir . '/.htaccess';
        if (!file_exists($uploadHtaccess)) {
            $rules = "<FilesMatch \"(?i)\\.(php|php3|php4|php5|phtml|phar|pl|py|jsp|asp|htm|html|shtml|sh|cgi)$\">\n"
                   . "    Order Deny,Allow\n"
                   . "    Deny from all\n"
                   . "</FilesMatch>\n"
                   . "Options -Indexes -ExecCGI\n";
            @file_put_contents($uploadHtaccess, $rules);
        }

        $destination = $uploadDir . '/' . $uniqueFilename;
        $saved = is_uploaded_file($file['tmp_name']) 
            ? move_uploaded_file($file['tmp_name'], $destination) 
            : (php_sapi_name() === 'cli' ? @rename($file['tmp_name'], $destination) : false);

        if (!$saved) {
            throw new Exception('Failed to save uploaded file to storage directory.');
        }

        // 6. Calculate image dimensions if it is an image
        $width = null;
        $height = null;
        if (str_starts_with($mime, 'image/') && $canonicalExt !== 'svg') {
            $imgSize = @getimagesize($destination);
            if ($imgSize) {
                $width = $imgSize[0];
                $height = $imgSize[1];
            }
        }

        // 7. Store media record in database
        $mediaId = Database::generateUuid();
        $publicUrl = '/uploads/' . $uniqueFilename;
        $altText = !empty($metadata['altText']) ? $metadata['altText'] : str_replace(['_', '-'], ' ', $safeNameBase);
        $title = !empty($metadata['title']) ? $metadata['title'] : $safeNameBase;
        $caption = $metadata['caption'] ?? null;
        $description = $metadata['description'] ?? null;
        $now = date('Y-m-d H:i:s');

        Database::execute(
            "INSERT INTO media (id, filename, original_name, mime_type, size, url, alt_text, title, caption, description, width, height, uploaded_by, created_at)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [
                $mediaId,
                $uniqueFilename,
                $originalName,
                $mime,
                $file['size'],
                $publicUrl,
                $altText,
                $title,
                $caption,
                $description,
                $width,
                $height,
                $uploader,
                $now
            ]
        );

        return [
            'id'           => $mediaId,
            'filename'     => $uniqueFilename,
            'originalName' => $originalName,
            'mimeType'     => $mime,
            'size'         => (int)$file['size'],
            'url'          => $publicUrl,
            'altText'      => $altText,
            'title'        => $title,
            'caption'      => $caption,
            'description'  => $description,
            'width'        => $width,
            'height'       => $height,
            'uploadedBy'   => $uploader,
            'createdAt'    => $now
        ];
    }
}
