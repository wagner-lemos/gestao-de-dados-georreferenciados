<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Status da API</title>
    <style>
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }
        body {
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: "Poppins", sans-serif;
            background: linear-gradient(135deg, #0f172a, #1e293b);
            color: #f1f5f9;
        }
        .card {
            background: rgba(255, 255, 255, 0.05);
            padding: 60px 80px;
            border-radius: 20px;
            text-align: center;
            max-width: 400px;
        }
        h1 {
            font-size: 1.8rem;
            margin-bottom: 10px;
        }
        p {
            font-size: 1rem;
            color: #cbd5e1;
        }

        .status-dot {
            display: inline-block;
            width: 14px;
            height: 14px;
            border-radius: 50%;
            background-color: #22c55e;
            margin-top: 20px;
            box-shadow: 0 0 8px #22c55e;
            animation: blink 1.2s infinite;
        }
        @keyframes blink {
            0%, 100% { opacity: 0.2; }
            50% { opacity: 1; }
        }
    </style>
</head>
<body>
    <div class="card">
        <h1>API em Funcionamento</h1>
        <p>Tudo certo! O servidor está respondendo corretamente.</p>
        <div class="status-dot"></div>
    </div>
</body>
</html>
