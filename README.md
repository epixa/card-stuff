# Set up project

You'll need to make sure all of the node module dependencies are installed.  The dependencies are identified
in package.json.

Type ```npm install -d``` while inside the project root in order to install dependencies.

To run the project locally, just type ```node app.js``` from within the project root.

# Git workflow

Fork notsafeforweb/Cards.

Clone your fork to your local machine.

Within your fork, add the notsafeforweb/Cards repo as a remote named "upstream":

```git remote add upstream git@github.com:notsafeforweb/Cards.git```

Whenever you start a new change, create a new branch for that change.  The following example command
will create a new branch called "readme" and will then check it out.

```git checkout -b readme```

This is a shorthand for the following two commands: ```git branch readme``` and ```git checkout readme```.

Work in your branch as necessary.  You can have as many commits to this branch as are necessary.  Whenever you want
to push your changes, remember to push to the correct branch:

```git push origin readme```

When you feel your change is ready to be reviewed to be merged into the project, go to your fork on github, select
your branch from the "Branches" section of the Code (default) tab, and click the pull request button in the upper
right.  You can review your commits and differences before actually issuing the pull request.  Make sure to also
include a clear description about the pull request.

At this point, track down one of the project collaborators to have them review the request and merge it.

You will want to frequently fetch changes from the upstream repository and merge them into your own fork.  To do
this, start by checking out your master repository:

```git checkout master```

Then fetch all changes from the upstream:

```git fetch upstream```

Since you should *never* be committed changes to your master branch, you can probably just reset it to the state
of the upstream master branch:

```git reset --hard upstream/master```

However, if you're concerned about doing that for some reason (perhaps you're not doing what you're suppose to be
doing), you can always take the safer route:

```git rebase upstream/master```

Take this time to make sure your master branch is up to date on your origin (your fork on github) as well:

```git push origin master```

If you want those changes in an existing branch that you were working on, checkout that branch and then rebase
on master:

```
git checkout readme
git rebase master
git push -f origin readme
```

The -f argument to git push ensures that the history is correctly written to the branch ("readme" in this example) in
your fork.  It is only necessary if your working branch was ahead of your master branch.  If you're not sure,
try to push without the -f flag first, and if that gives you some errors regarding fast-forwarding, you know you need
to use -f to make sure the history is written correctly.
