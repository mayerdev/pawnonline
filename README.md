## PawnOnline
#### Online IDE for Pawn
[Screenshot](https://github.com/mayerdev/pawnonline/blob/main/screenshot.png?raw=true)

### Installation guide

#### Ubuntu 18.04

Go to home:
> cd ~

Install NodeJS, npm, unzip and git:
> apt-get update && apt-get install nodejs npm unzip git -y

Clone this repo:
> git clone https://github.com/mayerdev/pawnonline.git

Go to directory and install packages:
> cd pawnonline && npm i 

Download pawncc 3.10.7:
> cd /tmp && wget https://github.com/pawn-lang/compiler/archive/v3.10.7.zip

Unzip and go to directory:
> unzip v3.10.7.zip && cd compiler-3.10.7

Install dependencies:
> apt-get install build-essential gcc-multilib cmake -y

Build and install:
> mkdir build && cd build
>
> cmake ../source/compiler -DCMAKE_C_FLAGS=-m32 -DCMAKE_BUILD_TYPE=Release
>
> make && make install
>
> ldconfig

Start IDE:
> cd ~ && node app.js

Open `http://127.0.0.1:8081/` in browser

## Use PawnOnline

### Step 1. Includes
For using PawnOnline you need install includes in directory `include` (if directory `include` not exists, create it).

### Step 2. Output
Create directory named `output`.