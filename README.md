#### This guide provides method for running PayForBlob Transactions.<br/><br/>
Install `screen, python3, pip` and install `flask` module
<br/>

```
sudo apt install screen python3 python3-pip -y
pip install flask
```
<br/>

Download `web_server.py`

<br/>

```
wget https://raw.githubusercontent.com/inklbot/celestia-ITN-PayForBlob-Transactions/main/web_server.py https://raw.githubusercontent.com/inklbot/celestia-itn/main/blob.sh
```

<br/>

Create `dashboard` folder and download index.html

<br/>

```
mkdir dashboard
cd dashboard
wget https://raw.githubusercontent.com/inklbot/celestia-ITN-PayForBlob-Transactions/main/index.html
cd ..
```

<br/>
Split terminal using screen
<br/>

```
screen -S web_server
```

<br/>

Run `web_server.py` in a split terminal

<br/>

```
python3 web_server.py
```
![image](https://user-images.githubusercontent.com/31788091/229338507-c71176c3-a864-466c-bc35-feaa0a216aab.png)
<br/>
DONE.<br/>


<br/>
