<?php
require_once __DIR__ . '/../includes/Database.php';
require_once __DIR__ . '/../includes/Upload.php';

// Create a small dummy image for testing
$tmpFile = __DIR__ . '/test_sample.png';
$im = imagecreate(100, 100);
$bg = imagecolorallocate($im, 109, 40, 217);
imagepng($im, $tmpFile);
imagedestroy($im);

$file = [
    'name'     => 'test_sample.png',
    'type'     => 'image/png',
    'tmp_name' => $tmpFile,
    'error'    => UPLOAD_ERR_OK,
    'size'     => filesize($tmpFile)
];

$res = Upload::process($file, ['altText' => 'Test PNG Alt', 'title' => 'Test PNG Title']);

echo "Upload test result:\n";
print_r($res);

if (!empty($res['id']) && $res['mimeType'] === 'image/png' && $res['width'] === 100 && $res['height'] === 100) {
    echo "\n[PASS] Media upload and metadata processing verified!\n";
} else {
    echo "\n[FAIL] Media upload failed!\n";
    exit(1);
}

// Clean up
@unlink(__DIR__ . '/../uploads/' . $res['filename']);
@unlink($tmpFile);
