Marton Teperics - Bizcuit Code Challenge

Hi!

This is my 4hr attempt on the coding challenge. I took this time indication quite seriously and as by the end of it, I do have some parts of the challenge that was left behind due to bugfixing / troubleshooting the docker-compose and the docker images.

The project structure is quite straight forward.

/be holds the node back end
/fe hold react front end code

There is a docker-compose, where I lost most of my time, I think I am mapping the db incorrectly, as the back end docker image throws a typeorm error.
The docker-compose up --build hence fails. But you can try and see the error.

How to run the project in this incomplete state:

/be npm run dev
/fe npm run start

A bit rudimental front end, with a landing page, task form and list components.

Parts missing, due to running out of time / passing waaaay more than required on trying to fix up the typeorm error:
- Basic user auth on the API is not implemented. JWT auth token would have been the plan here.
- Nice to have parts of the assignments were also left beind. Grouping todos are not possible. I was planning on creating a different collection that would store the ids of the grouped todos.

Thank you. It was fun.

