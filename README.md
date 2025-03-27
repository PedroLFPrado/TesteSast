# Projeto realizado para as matérias de ES1, LP2, SDI e PSW

# <AGP> Agenda Pessoal Escolar

A AGP é um sistema de agenda pessoal que busca ser uma ferramenta que
permitirá aos alunos gerenciarem suas matérias e atividades de forma eficiente, com
auxílio dos professores. Com esta agenda, os professores poderão cadastrar as matérias
que lecionam, as atividades destas matérias e avisos para os alunos. Os alunos, por outro
lado, poderão visualizar  todas essas matérias, atividades e avisos cadastrados, além das atividades que estão pendentes para serem realizadas. A
interface permitirá que os alunos e professores façam seu cadastro e login, além de
visualizarem todas as matérias e atividades registradas, facilitando o acompanhamento do
cronograma acadêmico. Além disso, as atividades que ainda precisam ser concluídas
poderão ser vistas em outra aba de Pendentes, auxiliando os alunos a visualizarem o que
precisam realizar. Assim que uma atividade for concluída, os alunos poderão marcá-la
como feita. Após marcarem como feita, os alunos também poderão visualizar todas as
tarefas feitas na aba de Concluídas. Essa ferramenta proporcionará uma gestão organizada
e prática das obrigações acadêmicas, contribuindo para uma melhor organização e
eficiência nos estudos dos alunos.

## Objetivos do Sistema

O objetivo da AGP é permitir que os alunos gerenciem suas atividades escolares
com auxílio dos professores. As funcionalidades do sistema são o cadastro e login de
alunos e professores, o CRUD das matérias, das atividades e dos avisos pelos professores,
a visualização das matérias e das atividades que compõem essa matéria, visualização das
atividades pendentes e concluídas pelos alunos e designação da atividade como concluída.

## Conectar-se ao AGP

O projeto pode ser acessado e utilizado pelo seguinte link (IP não se alterará):

http://44.199.1.220:3000

## Instruções de instalação e configuração

Caso queira implantar a AGP em seu sistema, é necessário a realização dos seguintes downloads no sistema que executará o projeto:
- Java e JDK
- NodeJS
- MySQL

É necessário a instalação destes softwares para implementação tanto local quanto na núvem (AWS). Instruções com detalhes de como realizar a implantação podem ser visualizadas no arquivo "AGP - Guia de Implantação", localizado em AGP\Desenvolvimento\5.Implantacao

## Componentes implementados na AWS

- Amazon EC2: Permite a criação das instâncias da aplicação. Oferece flexibilidade
para configurar o servidor conforme necessário e escalar manualmente.
- AWS RDS: Para o gerenciamento dos bancos de dados do sistema. Utilizamos
bancos relacionais, e o RDS pode nos auxiliar oferecendo backups automáticos,
recuperação, escalabilidade e monitoramento.
- AWS AutoScaling: Para prevenir custos desnecessários da aplicação, tanto das instâncias quanto do banco de dados RDS
- Amazon CloudWatch: Para monitorar métricas de desempenho e definir alertas
para a infraestrutura e o aplicativo, sendo ideal para monitorar o ambiente da
aplicação Java e React.
- AWS VPC: Para executar os recursos do projeto em uma rede virtual privada e poder utilizar das subredes para separar o Backend do projeto do Frontend.

## Diagrama de arquitetura do Projeto na AWS

![DiagramaArquiteturaAWS drawio](https://github.com/user-attachments/assets/8964d260-94c3-4a52-9969-1070478d8572)

O diagrama demonstra que utilizamos duas instâncias do EC2 separadas, uma para o
backend e outra para o frontend, que estão conectadas entre si. O Backend da aplicação é conectado com o banco
de dados do projeto (Um banco MySQL em uma instância do RDS). Todas as instâncias do projeto são monitoradas pelo Cloudwatch e a aplicação
passa pelo Cloudfront antes de passar pelo gateway da internet e chegar à internet. Por fim, um grupo de AutoScaling é utilizado para manter o equilibrio nas instâncias do projeto.

