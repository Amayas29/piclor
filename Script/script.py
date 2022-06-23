

# Script of Picolor 


# Importation of libraries
import numpy as np
import matplotlib.pyplot as plt
from PIL import Image
from sklearn.cluster import KMeans



# Functions


# Resizing images to 500px x 500px     
def Resize(image,new_width,new_height):
    
    width,height = image.size
    
    resized_image = Image.new(image.mode, (new_width, new_height), 'white')

    # un facteur < 1 --> retricement
    # un facteur > 1 --> etirement
    facteur_x = new_width/width
    facteur_y = new_height/height

    for y in range(new_height):
        for x in range(new_width):
            newX = int(np.round(x/facteur_x))
            newY = int(np.round(y/facteur_y))
            pixel = image.getpixel((newX,newY))
            resized_image.putpixel((x, y),  pixel)
            
    return resized_image

# Get the colors after running K-means algorithm
def PickleColorsFromImage(image,nbColors):
    image = Image.open(image)
    if(image.size[0] > 500 or image.size[1] > 500):
        image = Resize(image,500,500)
    pixels = np.array(image.getdata())
    kmeans = KMeans(n_clusters=nbColors).fit(pixels)
    return kmeans.cluster_centers_  


# Execution

# Inputs to get from user --> Image , Number_Of_Colors
image = ""
nbColors = 1
# Output --> Array of Colors

colors = PickleColorsFromImage(image,nbColors)