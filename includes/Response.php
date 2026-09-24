<?php
/**
 * HOUSE ROBOTICS — Standardized JSON API Response
 */

class Response {
    public static function json(array $data, int $statusCode = 200): void {
        // Clear any previous output or warnings
        if (ob_get_length()) {
            ob_clean();
        }

        http_response_code($statusCode);
        header('Content-Type: application/json; charset=UTF-8');
        header('X-Content-Type-Options: nosniff');
        header('X-Frame-Options: SAMEORIGIN');
        header('X-XSS-Protection: 1; mode=block');

        // CORS headers for API
        $origin = $_SERVER['HTTP_ORIGIN'] ?? '*';
        header("Access-Control-Allow-Origin: {$origin}");
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');

        echo json_encode($data, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
        exit;
    }

    public static function success(mixed $data = null, string $message = 'Operation completed successfully', int $code = 200, array $extra = []): void {
        $payload = [
            'success' => true,
            'message' => $message,
            'data'    => $data,
        ];
        if (!empty($extra)) {
            $payload = array_merge($payload, $extra);
        }
        self::json($payload, $code);
    }

    public static function error(string $message = 'An error occurred', int $code = 400, mixed $errors = null, ?string $errorCode = null): void {
        $payload = [
            'success' => false,
            'message' => $message,
        ];
        if ($errors !== null) {
            $payload['errors'] = $errors;
        }
        if ($errorCode !== null) {
            $payload['code'] = $errorCode;
        }
        self::json($payload, $code);
    }

    public static function unauthorized(string $message = 'Authentication required'): void {
        self::error($message, 401, null, 'AUTH_REQUIRED');
    }

    public static function forbidden(string $message = 'Access forbidden'): void {
        self::error($message, 403, null, 'FORBIDDEN');
    }

    public static function notFound(string $message = 'Resource not found'): void {
        self::error($message, 404, null, 'NOT_FOUND');
    }

    public static function validationError(array $errors, string $message = 'Validation failed'): void {
        self::error($message, 422, $errors, 'VALIDATION_FAILED');
    }

    public static function rateLimited(string $message = 'Too many requests. Please try again later.'): void {
        self::error($message, 429, null, 'RATE_LIMITED');
    }

    public static function serverError(string $message = 'Internal server error'): void {
        self::error($message, 500, null, 'SERVER_ERROR');
    }
}
