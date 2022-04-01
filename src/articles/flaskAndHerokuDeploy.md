# Deploy Flask APP on Heroku

![](https://i.imgur.com/A2NUkdZ.png)

[TOC]

## Prepare a Flask APP for Heroku
Assume that there is already a Flask APP, **There have to be 3 important files** in the root directory of your APP:
> Here is a [minimal Flask APP](https://github.com/yirueilu-b/flask-minimal-app)

### `requirements.txt`:
This file make **Heroku know what Python libraies shuold be installed** during conpute instance starts. We could run below command to create it after testing your Flask APP is working locally.
> Gunicorn must be listed in `requirements.txt` since Heroku runs Flask APP with it. We can simply install Gunicorn by `pip install gunicorn`.
```
pip freeze > requirements.txt
```
### `Procfile`
For letting Heroku start the APP. This file must be named as `Procfile` and placed at the root directory of our project to make Heroku find it when trying to start the APP. Below is the content of `Procfile`, `entrypoint` is the name of the Python file that runs Flask APP (usually `main.py` or `app.py`) and the `app instance` is the Flask APP instance in `entrypoint`.
```python
# This is etrypoint Python file.
from flask import Flask

# This is the app instance.
app = Flask(__name__)


@app.route("/")
def hello_world():
    return "<p>Hello, Flask APP on Heroku!</p>"
```

```
web gunicorn [entrypoint]:[app instance]
```
### `runtime.txt`
Specify the version of Python for the project. We can use `python -V` to check the current installed version of Python and fill the version in the file in `python-x.x.x` format.
```
python-x.x.x
```

### Test the APP Locally and Upload the Code to GitHub REPO

Once `requirements.txt`, `Procfile` and `runtime.txt` are prepared, we could
upload it to a GitHub REPO.

- Run `gunicorn -b:5000 [entrypoint]:[app instance]` to see if the APP works correctly.
- Create a new REPO on GitHub name `REPO name`.
- Run following command in the root directory:
    ```
    git init
    git add .
    git commit -m "Init commit"
    git remote add origin https://github.com/[GitHub username]/[REPO name].git
    git branch -M main
    git push -u origin main
    ```

## Setup Heroku
An Heroku account is required for following steps. You could signup [here](https://signup.heroku.com/login)

### Create New APP and Deploy
- Sign in Heroku.
- Click `New` $\rightarrow$ `Create new app`.
    ![](https://i.imgur.com/RvQi7oN.png)
- Fill `app-name` then click `Create app`.
    ![](https://i.imgur.com/84mO901.png)
    > After clicking `Create app`, we will be redirected to deploy setting page.
- Choose `GitHub` in `Deployment method` section and connect our REPO.
    ![](https://i.imgur.com/klfaItT.png)
- Select the branch to deploy.
    ![](https://i.imgur.com/W8haNHe.png)
    > Click the `Enable Automatic Deploys` then when we push new code to the given branch, Heroku will help us deploy it automatically.
- Click the `Deploy Branch` in `Manual deploy` section.
    ![](https://i.imgur.com/8Q1stMf.png)
- We could now click `Open app` on top of the page and see if it works!

### Setup Environment Variables For Our APP
- Add environment variables in `Settings\Config Vars` on the APP console page
    ![](https://i.imgur.com/dUmxFnq.png)
> These variables would be set when Heroku start a new instance, we could go to deploy page and deploy manually to make the change take effect.
