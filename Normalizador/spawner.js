const { spawn } = require('child_process');

const ls = spawn('cmd.exe', [
    '/c', 'cd', 'C:\\pentaho\\pentaho\\data-integration\\',
    '&&', 'Kitchen.bat',
    '-file:C:/Servidor/etl_job/hdi/HDI014_com_JOB_master.kjb',
    '"-param:a_corretora.file=refere"',
    '"-param:b_corretora.path=refere/"',
    '"-param:filename=C:\\Servidor\\Processamento\\Clientes\\Refere\\EDI\\hdi\\hdi2sicoob_comiss_c_500013156_201712010311.txt"'
]);

ls.stdout.on('data', (data) => {
    console.log(data.toString());
});

ls.stderr.on('data', (data) => {
    console.log(data.toString());
});

ls.on('exit', (code) => {
    console.log(`Child exited with code ${code}`);
});
