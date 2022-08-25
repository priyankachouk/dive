# Dive - Analyze Docker Images
  
  

What's in your Docker image? "Dive" in to find out


Docker Images are a great way to package software applications along with their libraries, tools, 
files, and other dependencies and run them as lightweight containers.


But the question is does it always remain lightweight?


In reality, a Docker image is made up of layers, and with every layer you add on, more space will be taken up by the image.
Therefore, the more layers in the image, the more space the image will require.

Or you can say each line in the Dockerfile, (like a separate RUN instruction) adds a new layer to your image.

Why do we need smaller images? Here are a few reasons:
------------------------------------------------------

* Faster transfer & deployment in CI/CD server

* Less layers fewer chances for attackers to attack

** To analyze a Docker image we can use Dive. Dive is a tool by Alex Goodman. **

It is used for exploring a docker image, layer contents, and discovering ways to shrink the size of your Docker/OCI image.


What does Dive help us with?
----------------------------

It ….

*  Breaks down the image contents in the Docker image layer by layer

*  Shows the contents of each layer in details

*  Shows the total size of the image

*  Shows how much space was potentially wasted -> the lower the better & “this is that was want to reduce”

*  Shows the efficiency score of the image -> the higher the better


Installation
-------------

Ubuntu/Debian

        wget https://github.com/wagoodman/dive/releases/download/v0.9.2/dive_0.9.2_linux_amd64.deb
        sudo apt install ./dive_0.9.2_linux_amd64.deb


RHEL/Centos

        curl -OL https://github.com/wagoodman/dive/releases/download/v0.9.2/dive_0.9.2_linux_amd64.rpm
        rpm -i dive_0.9.2_linux_amd64.rpm



Windows

  Download the latest release ( https://github.com/wagoodman/dive/releases/download/v0.9.2/dive_0.9.2_windows_amd64.zip) .


Go tools Requires Go version 1.10 or higher.

        go get github.com/wagoodman/dive


Docker

        docker pull wagoodman/dive




How to use Dive
----------------

To analyze a Docker image simply run dive with an image tag/id/digest:

        $ dive <your-image-tag>


or if you want to build your image then jump straight into analyzing it:

        $ dive build -t <some-tag> .


When you run the dive command on a docker file what you see is something like this on the terminal. 
In the below command we fetch the mongo:3.6 image file.


      ~ dive mongo:3.6
      Image Source: docker://mongo:3.6
      Fetching image... (this can take a while for large images)
      Handler not available locally. Trying to pull 'mongo:3.6'...




![image](https://user-images.githubusercontent.com/50665675/182139733-5046ee8e-7112-495f-b6d8-6ed034fa874b.png)
---------------------------------------------------------------------------------------------------------------





In the left panel, we can see the layers of the given image. The selected layer is in purple color.
You can move through the layers with up & down arrow keys. When you have selected a layer then the right panel shows all the files that are present in that layer.



The files are further shown in 3 colors.

      green  - New files
      yellow - Edited files
      red    - Deleted files




![image](https://user-images.githubusercontent.com/50665675/182143146-e3649bd8-ee06-49ed-b1c8-82a75d556614.png)
-----------------------------------------------------------------------------------------------------------------





In the above image,
the second layer is selected and it shows the files newly added in green and modified files in yellow in the right pane



![image](https://user-images.githubusercontent.com/50665675/182143274-28fe321b-c54c-4453-aa9b-ba916b340636.png)
---------------------------------------------------------------------------------------------------------------





In the above image, the third layer is selected and it shows the files modified in yellow and files deleted in red in the right pane.


You can toggle between the options as shown at the bottom of the window



![image](https://user-images.githubusercontent.com/50665675/182143361-2bc18b89-026a-4e44-9a9c-c843e0270335.png)
---------------------------------------------------------------------------------------------------------------




A few tips to keep your Docker images slim
------------------------------------------


**Use a small base image (Alpine) wherever possible**


Alpine image is only 5 MB in size and has access to a package repository that is much more complete than other BusyBox based images


**Use ".dockerignore"**
   
   
Just the way you have .gitignore, Docker has a .dockerignore file.
This excludes files that are not necessary for your image thus reducing the size of the image


**Use multi-stage builds**


With multi-stage builds, you use multiple FROM statements in your Dockerfile. 
Each FROM instruction can use a different base, and each of them begins a new stage of the build. 
You can selectively copy artifacts from one stage to another, leaving behind everything you don’t want in the final image. 


**Avoid unnecessary layering**

Each RUN instruction in a Dockerfile adds a new layer to your image. 
Combining multiple RUN commands into one using && option helps in reducing the number of layers.


**Always use the latest versions of the platform whenever possible**


**Caching**

It doesn’t affect the size of the image but definitely helps faster builds. 
Place instructions that are likely to change as low in the Dockerfile as possible.


Reference:  https://github.com/wagoodman/dive


Basic Features
--------------

**Show Docker image contents broken down by layer**

As you select a layer on the left, you are shown the contents of that layer combined with all previous layers on the right. Also, you can fully explore the file tree with the arrow keys.

**Indicate what's changed in each layer**

Files that have changed, been modified, added, or removed are indicated in the file tree. This can be adjusted to show changes for a specific layer, or aggregated changes up to this layer.

**Estimate "image efficiency"**

The lower left pane shows basic layer info and an experimental metric that will guess how much wasted space your image contains. This might be from duplicating files across layers, moving files across layers, or not fully removing files. Both a percentage "score" and total wasted file space is provided.

**Quick build/analysis cycles**

You can build a Docker image and do an immediate analysis with one command: 

        dive build -t some-tag 

You only need to replace your docker build command with the same dive build command.

**CI Integration**

Analyze an image and get a pass/fail result based on the image efficiency and wasted space. 
Simply set CI=true in the environment when invoking any valid dive command.







