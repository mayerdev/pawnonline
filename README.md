## PawnOnline
#### Online IDE for Pawn
![Screenshot](https://github.com/mayerdev/pawnonline/blob/main/screenshot.png?raw=true)

### Installation guide

Go to home:
> cd ~

#### Ubuntu 18.04

Install NodeJS, npm, unzip, git and build dependencies:
> apt-get update && apt-get install nodejs npm unzip git build-essential gcc-multilib cmake -y

Download pawncc 3.10.7:
> cd /tmp && wget https://github.com/pawn-lang/compiler/archive/v3.10.7.zip

Unzip and go to directory:
> unzip v3.10.7.zip && cd compiler-3.10.7

Build and install:
> mkdir build && cd build
>
> cmake ../source/compiler -DCMAKE_C_FLAGS=-m32 -DCMAKE_BUILD_TYPE=Release
>
> make && make install
>
> ldconfig

#### macOS

Download pawncc prebuild binaries and unzip
> wget https://github.com/pawn-lang/compiler/releases/download/v3.10.7/pawnc-3.10.7-macos.zip && unzip pawnc-3.10.7-macos.zip

Install binaries and library:
> mv pawnc-3.10.7-macos/bin/* /usr/local/bin
>
> sudo mv pawnc-3.10.7-macos/lib/* /usr/local/lib


#### Install IDE
Clone this repo:
> git clone https://github.com/mayerdev/pawnonline.git

Go to directory and install packages:
> cd pawnonline && npm i 

Start IDE:
> node app.js

Open `http://127.0.0.1:8081/` in browser

P.S You can change port in `config.json`

## Use PawnOnline

### Step 1. Includes
For using PawnOnline you need install includes in directory `include` (if directory `include` not exists, create it).

### Step 2. Output
Create directory named `output`.