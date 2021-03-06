var fs = require('fs');
var prompt = require('prompt');

var common={};

//Fonction lisant config.json et demandant l'username/pass lorsqu'il ne les trouve pas.
//Appelle le callback lorsqu'il dispose de toutes les infos.
common.getConfig = function(callback){
  var config = JSON.parse( fs.readFileSync( 'config.json' ) );
  prompt.override = config;
  prompt.message='[PROMPT]';
  prompt.start();
//if(config.login=='')
//  console.log("[PROMPT] Ces paramètres n'ont pas été trouvés dans config.json : ");
  prompt.get([
      {name:'login', description:'Login',required: true},
      {name:'password',hidden:true, description:'Mot de passe',required: true}
    ], function(err, result){
      var c = {};
      //Valeurs par défaut
      c.debug=false;
      c.dir='.';
      c.ext='.ls';
      c.encoding='utf8';
      c.autocrlf=false;
      c.tab='\t';
      c.keep_local_sources=false;
      c.farmer_dir=true;
      if(config.debug!==null)
        c.debug=config.debug;
      if(config.dir!==null)
        c.dir=config.dir;
      if(config.ext!==null)
        c.ext=config.ext;
      if(config.encoding!==null)
        c.encoding=config.encoding;
      if(config.autocrlf!==null)
        c.autocrlf=config.autocrlf;
      if(config.tab!==null)
        c.tab=config.tab;
      if(config.keep_local_sources!==null)
        c.keep_local_sources=config.keep_local_sources;
      if(config.farmer_dir!==null)
        c.farmer_dir=config.farmer_dir;
      c.login=result.login;
      c.password=result.password;
      callback(c);
    });
}


module.exports=common;