//ecosystem.config.js
module.exports = {
  apps: [{
    name: 'kanbanflow-pro-api',
    script: './server/server.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development',
      PORT: 3001,
      FRONTEND_URL: 'http://localhost:5173',
      DATA_FILE_PATH: './server/data/tasks.json'
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 3001,
      FRONTEND_URL: 'https://kanbanflow.visiochat.cloud',
      DATA_FILE_PATH: '/var/www/kanbanflow-pro/server/data/tasks.json'
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    merge_logs: true
  }]
};
