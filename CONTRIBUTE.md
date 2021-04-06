# How to contribute
To contribute to this project, follow these instructions.

## Table of contents
- [How to contribute](#how-to-contribute)
	- [Table of contents](#table-of-contents)
	- [Install `git`](#install-git)
	- [Install `Node.js`](#install-nodejs)
	- [Do some changes](#do-some-changes)
	- [Commit and Push](#commit-and-push)

## Install `git`
To install the `git` utility that will permit us to manage our Github content. Simply [download it](https://git-scm.com/download) from the official `git` website. You'll have to download the **`Git for Windows Setup`** software.
Once, execute the installer to install it.

## Install `Node.js`
`Node.js` allows you to use JavaScript out of a web browser. In our case, we use `Node.js` to have access to many dependencies to simplify our project.  
We will then build our project (*with [`Parcel.js`](https://parceljs.org/) dependency*), to convert it into a simple website in HTML, CSS and JS files.

To use `Node.js`, [download it](https://nodejs.org/en/download/) from the official website. You'll have to download the **installer** (*not binary*) for the **`LTS`** version, not the `Current`.

Once the installer is downloaded, run it to install `Node.js`.

## Do some changes
The 2 following steps are only to do the first time, to get the project.  
**Download the git repository, and open the folder**  
```bash
$ git clone https://github.com/mlbonniec/yoga-booking
$ cd yoga-booking
```

**Install dependencies**  
```bash
$ npm install
```

**Run the projet**  
Run the dev script to have your changes in real time on your browser.
```
$ npm run dev
```

**Pull everytime you want to make changes**  
Each time you want to make new changes, it is essential to pull. This will retrieve any changes made by other contributors.  
Simply click on the 2 arrows in the circle at the bottom left of Visual Studio Code.

<p align="center">
	<img width="507" alt="Pull" src="https://user-images.githubusercontent.com/29955402/113331982-e549fd00-9320-11eb-8158-9e26abe048ae.png">
</p>

Once your changes made, you can commit them, and push them to your remote repository.  
*If you're an official contributor to this project, you don't have to create a Pull Request.*

## Commit and Push
We'll see how to make commit and push your changes only inside Visual Studio Code. It's better simple than in command line terminal.

Once you've done you modification, go to the `git` tabs in the left side of Visual Studio Code.

<p align="center">
	<img width="577" alt="Sidebar" src="https://user-images.githubusercontent.com/29955402/113329504-f2192180-931d-11eb-9f59-b0e82d83bae3.png">
</p>

Click on the `+` corresponding to the files you want to describe the changes.

<p align="center">
	<img width="576" alt="Select file" src="https://user-images.githubusercontent.com/29955402/113329780-491ef680-931e-11eb-8cd8-273cbccb4317.png">
</p>

Then, write the commit message (*a short message to describe the changes made*).

<p align="center">
	<img width="577" alt="Commit message" src="https://user-images.githubusercontent.com/29955402/113330092-a9ae3380-931e-11eb-9cb7-4982c3f8e5be.png">
</p>

Finally, click on the check button, to commit (*to validate your changes*).  

<p align="center">
	<img width="575" alt="Commit" src="https://user-images.githubusercontent.com/29955402/113330426-027dcc00-931f-11eb-8752-50c67a4d34f1.png">
</p>

Repeat these 4 last actions as many times as you have made modifications. Otherwise, you can add all the files at once. (*it's still better in multiple times*)

Once, you can push your modification. All the work you've just commit, will be sent to github, and will be accessible to everyone. Just click to the arrows at bottom left on Visual Studio Code.

<p align="center">
	<img width="590" alt="Push" src="https://user-images.githubusercontent.com/29955402/113331181-e7f82280-931f-11eb-8d58-74cac7cbde7f.png">
</p>
