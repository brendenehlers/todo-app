# Composer

Whatever is in here is designed to sit between the front-end and back-end and orchestrate the connection between them.  Maybe this is some sort of docker thing, or something else.  It's a very rough idea.

All I know is this should accomplish the following goals:
1. make changing which frontend/backend is being used simple
    - ideally, this should be as simple as just changing the directory that the composer references.  maybe updating a port as well
2. be the entry point for the app
    - running the composer should start up both the frontend and backend and have them communicate with one another right away.  back to the point of minimal configuration

Ideas:
- docker compose with configuration files for each project
- nginx that points requests to different parts of the app (even possible?)