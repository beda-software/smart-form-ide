import json
import os
import shutil

import requests

MATHBOX_URL = "http://localhost:8084/matchboxv3/fhir"
CONTENT_TYPE_FHIR_MAPPING = "text/fhir-mapping"
CONTENT_TYPE_FHIR_JSON = "application/fhir+json"
ACCEPT_FHIR_JSON = "application/fhir+json"


def convert_maps(root_dir):
    maps_dir = os.path.join(root_dir, "maps")

    sources = []
    for map_name in os.listdir(maps_dir):
        map_file = os.path.join(maps_dir, map_name)
        with open(map_file) as f:
            content = f.read()
            sources.append(content)

    maps = []
    for source in sources:
        r = requests.post(
            f"{MATHBOX_URL}/StructureMap/$convert",
            data=source,
            headers={"Content-Type": CONTENT_TYPE_FHIR_MAPPING},
        )
        maps.append(json.loads(r.content))

    target_dir = os.path.join(root_dir, "StructureMap")
    if os.path.exists(target_dir):
        shutil.rmtree(target_dir)
    os.mkdir(target_dir)

    for map in maps:
        id = map["name"]
        target_file_name = f"{id}.json"
        target_file = os.path.join(target_dir, target_file_name)
        with open(target_file, "w") as f:
            f.write(json.dumps(map))


def main():
    root_dir = os.path.dirname(os.path.abspath(__name__))
    convert_maps(root_dir)


if __name__ == "__main__":
    main()
