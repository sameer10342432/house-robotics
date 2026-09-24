<?php
$hash = password_hash('Y&VO{(w0J3A6}', PASSWORD_BCRYPT, ['cost' => 12]);
echo "Calculated Hash: " . $hash . "\n";
echo "Verify check: " . (password_verify('Y&VO{(w0J3A6}', $hash) ? 'VALID' : 'INVALID') . "\n";
