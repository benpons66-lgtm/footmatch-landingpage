<?php
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  echo json_encode(['message' => 'Méthode non autorisée.']);
  exit;
}

$raw = file_get_contents('php://input');
$data = json_decode($raw, true);
$email = trim($data['email'] ?? $_POST['email'] ?? '');

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  http_response_code(422);
  echo json_encode(['message' => 'Entre une adresse email valide.']);
  exit;
}

$storageDir = dirname(__DIR__, 2) . DIRECTORY_SEPARATOR . 'footmatch-data';
if (!is_dir($storageDir) && !mkdir($storageDir, 0755, true)) {
  http_response_code(500);
  echo json_encode(['message' => 'Impossible de préparer la liste d’attente.']);
  exit;
}

$file = $storageDir . DIRECTORY_SEPARATOR . 'waitlist.csv';
$line = sprintf(
  "\"%s\",\"%s\",\"%s\"\n",
  date('c'),
  str_replace('"', '""', strtolower($email)),
  str_replace('"', '""', $_SERVER['REMOTE_ADDR'] ?? '')
);

if (file_put_contents($file, $line, FILE_APPEND | LOCK_EX) === false) {
  http_response_code(500);
  echo json_encode(['message' => 'Impossible d’enregistrer ton email pour le moment.']);
  exit;
}

echo json_encode(['message' => 'Merci, tu es bien inscrit sur la liste d’attente.']);
