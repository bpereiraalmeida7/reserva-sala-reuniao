# Sistema para reserva de sala de reunião.

Este sistema tem como objetivo permitir que um usuário responsável pela tarefa (agendamento de salas), consiga cadastrar colaboradores, salas e por fim com esses registros, agendar a sala específica para o colaborador solicitante.

###### Lógica geral do sistema

Ao inserir um novo agendamento, ele irá filtrar as salas disponiveis de acordo com a data, hora inicial e final da reunião, se a sala necessita ter computador, sistema para videoconferência, ou projetor, dados esses, especificados pelo solicitante da reunião.

###### O sistema

Este sistema foi desenvolvido com duas tecnologias atuais, uma para o frontend (Angular 8), e outra para o backend (Laravel 6), sendo esta última desenvolvida no formato API RestFull. Para entender os requisitos e processo de instalação de cada framework e suas bibliotecas, segue o guia de cada um:

* front-reserva - [(Angular)](https://pages.github.com/)
* api-reserva - [(Laravel)](https://github.com/bpereiraalmeida7/reserva-sala-reuniao/blob/master/api-reserva/README.md)
