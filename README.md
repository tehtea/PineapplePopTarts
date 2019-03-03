# PineapplePopTarts

## General Coding Guidelines

Naming:
 - if a variable name requires a comment, it does not reveal its intent. So, rename accodingly.
 - use constants to make code readable
 - creating a simple class instead of using arrays may increase the level of intention-revelation when naming variables
 - do not name variables using language-specific keywords
 - make meaningful distinctions between each variable
 - use pronounceable names so that variables can be used in conversation.
 - use names which are easily searchable
 - don't include member prefixes in classes because it is a sign that your class is too bloated
 - a class name should not be a verb
 - method names shouldd have verb or verb phrases
 - standardize your terminology. E.g. don't use get and fetch interchangeably.
 - choose technical names for variables since they are usually universally known to programmers
 - use problem domain names
 - Don’t be afraid to make a name long. A long descriptive name is better than a short enigmatic name. 

Functions:
 - keep them small
 - should only do one thing (If a function does only those steps that are one level below the stated name of the function, then the function is doing one thing. After all, the reason we write functions is to decompose a larger concept (in other words, the name of the function) into a set of steps at the next level of abstraction.)
 - use as little input arguments as possible
 - flag arguments is bad practice
 - three arguments is difficult to read
 - make sure your function doesn't have any side effect - meaning it should not change the other states of the program apart from the one it may have been purposed for
 - avoid pass-by-reference in general as they may be confused for input arguments
 - functions should either change the state of an object, or return information about that object, not both.
 - throw exceptions instead of returning error codes (increases readability)
 - avoid goto unless its a large function (which in general is bad code smell)
 - insert part about comments here

Source: Clean Code (2018)

## Git Workflow 

*Format: `<general description>: <git command>`*
1. Get the latest stable version of the code base: `git pull origin master` 
2. Create a new branch for yourself: `git branch <branch-name>` <br> For this project, use the convention `<subsystem>-<author>`
3. Work on the feature that you want to add.
4. Stage a file so git knows you want to store its current state in its system: `git add <filename>` (shortcut to stage all files: `git add .`)
5. Store current state of all staged files (and add a message to say what has changed): `git commit -m "<message>"`
6. Put your version of the code base into the repository: `git push origin <branch-name that you set in stage 2>`
7. Create a pull request for that branch (done via github). 

Example:
John wants to make the map subsystem display a new "help me" button. He runs `git pull origin master` on the command line while its current working directory is the root project file, then creates a new branch using `git branch CrisisMap-John`. After changing the .html and .js files in ./CrisisMap to add the button, he runs `git add .` to stage all these changed files, then runs `git commit -m "added new help me button"`. Finally, he runs `git push origin CrisisMap-John` and creates a pull request for that branch so his new feature can be approved.