import os
glsl_files = []
for dp, dn, fn in os.walk(os.path.expanduser("./")):
    if "dist" not in dp and "node_modules" not in dp:
        for f in fn:
            if ".frag" in f or ".vert" in f:
                path = os.path.join(dp, f)
                new_path = path.replace("./", "./dist/")
                os.system(f"cp {path} {new_path}")