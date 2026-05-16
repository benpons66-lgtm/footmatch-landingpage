<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

function respond(int $status, string $message): void {
  http_response_code($status);
  echo json_encode(['message' => $message], JSON_UNESCAPED_UNICODE);
  exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  respond(405, 'Méthode non autorisée.');
}

$raw = file_get_contents('php://input');
$data = json_decode($raw, true);
$email = trim((string)($data['email'] ?? $_POST['email'] ?? ''));

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  respond(422, 'Entre une adresse email valide.');
}

$storageDir = dirname(__DIR__) . DIRECTORY_SEPARATOR . 'footmatch-data';
if (!is_dir($storageDir) && !mkdir($storageDir, 0755, true)) {
  respond(500, 'Impossible de préparer la liste d’attente.');
}

$file = $storageDir . DIRECTORY_SEPARATOR . 'waitlist.csv';
$line = sprintf(
  "\"%s\",\"%s\",\"%s\"\n",
  date('c'),
  str_replace('"', '""', strtolower($email)),
  str_replace('"', '""', $_SERVER['REMOTE_ADDR'] ?? '')
);

if (file_put_contents($file, $line, FILE_APPEND | LOCK_EX) === false) {
  respond(500, 'Impossible d’enregistrer ton email pour le moment.');
}

respond(200, 'Merci, ton email a bien été pris en compte.');
