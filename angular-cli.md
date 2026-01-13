# THE ANGULAR CLI = Command Line Interface

## Several Useful Commands
- all of these start with ng (a-NG-ular), then the command and possible flags
- ng --help gives you a list of the root commands
- ng new <command name> --help to get help on a specific command
- ng new <project name> to create a new Angular project
   - this creates a folder with the same neame and puts everything in it 
   - this ALSO creates a Github repo if you're not already inside one 
   - if you move a project created outside into an existing repo, you'll need to delete the new repo, etc
- ng serve will build and serve the project, usually at localhost:4200
   - use --open or -o to open a browser window automatically
   - if you're not seeing changes happening when you save files, you can add --live-reload
   - if you have compilation errors, Angulat will throw those errors in the console and browser
- ng generate (or ng g ) <type> <name> will create a new Angular element of this type/name 
    - ng g component product will create all the files for a new component called product
    - ng g service http will create all the files for a new service called http, etc.
- ng test will run your test suite, i.e., all the unit tests you've written