CC0 model — athlete-jog.glb
===========================

Source: "Jog - Sam 3D Person, Animated" from the Innerscene free 3D parts library
        https://www.innerscene.com/tools/library/3d-parts/jog-sam-3d-person-animated-c738263f
Licence: CC0 1.0 Universal (public domain) — free to use, modify and redistribute,
         including commercially, with no credit required.
         https://creativecommons.org/publicdomain/zero/1.0/
Built from MakeHuman/MPFB CC0 body, rig and skin assets.

Original file: jog-sam-3d-person-animated.glb (21.0 MB), one looping "Jog" clip
(1.0 s, 30 fps, 168 channels), real-world scale (~1.89 m tall, feet at origin).

Optimised for this site with @gltf-transform/cli:

  gltf-transform optimize jog-sam.glb athlete-jog.glb \
    --compress false --texture-compress webp --texture-size 1024 --simplify false

Result: 4.85 MB. Textures resized to 1024 px and re-encoded as WebP, unused nodes
pruned. Geometry, rig and the animation are unchanged. `quantize` was tried and
rejected — it dropped the skin and broke the bind pose.

In the scene all node materials are replaced with a single dark moss material, so
the figure reads as a monochrome athlete silhouette rather than a textured
character. The clip is played continuously on loop; the mesh itself does not
translate (it is played in place).
