const Uploaded = require('./models/Uploaded');
const Arquivo = require('./models/Arquivo');
const { spawn } = require('child_process');

setInterval(() =>{
    Uploaded.findOne({'status': 'Processando'},  (err, file) => {
        if(!file){
            Uploaded.findOne({'status': 'Aguardando'},  (err, upload) => {
                if(upload) {
                    Arquivo.findOne({'nome': `${upload.cia}_${upload.tipo}`}, (err, arquivo) => {
                        upload.status = 'Processando';
                        upload.mensagem = 'Arquivo em processamento!';
                        upload.save();

                      setTimeout(()=>{
                        upload.status = 'Processado';
                        upload.mensagem = 'Arquivo processado com sucesso!';
                        upload.save();
                      },8000)
                    });
                }
            });
        }
    });
},5000);
