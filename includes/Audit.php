<?php
/**
 * HOUSE ROBOTICS — Admin Activity Audit Logger
 */

require_once __DIR__ . '/Database.php';

class Audit {
    public static function log(array $data): void {
        try {
            $id = Database::generateUuid();
            $adminId   = $data['adminId'] ?? null;
            $adminName = $data['adminName'] ?? 'Admin';
            $action    = $data['action'] ?? 'ACTION';
            $entity    = $data['entity'] ?? 'General';
            $entityId  = $data['entityId'] ?? null;
            $metadata  = !empty($data['metadata']) ? json_encode($data['metadata']) : null;
            $now       = date('Y-m-d H:i:s');

            Database::execute(
                "INSERT INTO activity_logs (id, admin_id, admin_name, action, entity, entity_id, metadata, timestamp)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
                [$id, $adminId, $adminName, $action, $entity, $entityId, $metadata, $now]
            );
        } catch (Throwable $e) {
            // Non-blocking for audit logging
            error_log("[Audit Log Warning] " . $e->getMessage());
        }
    }
}
