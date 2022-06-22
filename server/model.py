from sklearn.cluster import KMeans
import numpy as np


def component_to_hex(c):
    hexa = hex(c)
    hexa = hexa[2:]
    hexa = "0" + hexa if len(hexa) == 1 else hexa
    return hexa


def rgb_to_hex(r, g, b):
    return "#" + component_to_hex(r) + component_to_hex(g) + component_to_hex(b)


def get_colors_from_image(image, nb_colors):
    image = image.resize((500, 500))
    pixels = np.array(image.getdata())

    kmeans = KMeans(n_clusters=nb_colors).fit(pixels)
    centers = kmeans.cluster_centers_

    return [rgb_to_hex(int(center[0]), int(center[1]), int(center[2])) for center in centers]
