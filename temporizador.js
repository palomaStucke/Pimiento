
        document.getElementById('temporizador').addEventListener('click', function(){
            this.classList.toggle('active');
        })

        var segundos=0;
        var reloj=null;

        function cargarEstadoTemporizador(){
            const guardado= localStorage.getItem('temporizador_segundos');
            segundos= guardado ? parseInt(guardado,10) : 0;
            actualizarTimerDisplay();

            if(localStorage.getItem('temporizador_activo') === '1'){
                iniciarTemporizador();
            }
        }

        function guardarEstadoTemporizador(activo){
            localStorage.setItem('temporizador_segundos', segundos);
            localStorage.setItem('temporizador_activo', activo ? '1' : '0');
        }

        function iniciarTemporizador(){
            if(!reloj){
                reloj= setInterval(()=>{
                    segundos++;
                    actualizarTimerDisplay();
                    guardarEstadoTemporizador(true);
                }, 1000);
                guardarEstadoTemporizador(true);
            }
        }

        function actualizarTimerDisplay(){
            const horas= Math.floor(segundos/3600);
            const minutos= Math.floor( (segundos%3600) / 60);
            const segs= segundos%60;

            document.querySelectorAll('.timer-display') .forEach( display=>{
                display.textContent= `${String(horas).padStart(2, '0')}:${String(minutos).padStart(2, '0')}:${String(segs).padStart(2, '0')}`;
            });
        };

        document.querySelectorAll('.timer-buttons button') .forEach( button=>{
            button.addEventListener('click', function(){
                const accion= this.textContent;

                if( accion === 'Iniciar'){
                    iniciarTemporizador();
                }
                if( accion === 'Borrar'){
                    clearInterval(reloj);
                    reloj=null;
                    segundos=0;
                    actualizarTimerDisplay();
                    guardarEstadoTemporizador(false);
                };
                if( accion === 'Pausar'){
                    clearInterval(reloj);
                    reloj=null;
                    guardarEstadoTemporizador(false);
                };
            });
        });
        cargarEstadoTemporizador();