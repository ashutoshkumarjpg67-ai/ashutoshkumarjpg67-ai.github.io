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
pruned. Geometry, rig and the animation are unchanged.

Then geometry compressed with Meshopt:

  gltf-transform meshopt athlete-jog.glb athlete-jog-meshopt.glb

Result: 1.70 MB, stored back over athlete-jog.glb. This adds
`EXT_meshopt_compression`, `EXT_texture_webp` and `KHR_mesh_quantization` to
`extensionsRequired`, so the loader must have the Meshopt decoder attached
(see `src/components/3d/AthleteModel.tsx`). Do not strip the decoder call — the
model will fail to parse without it.

An earlier standalone `quantize` pass was rejected: applied without Meshopt it
dropped the skin and broke the bind pose.

In the scene all node materials are replaced with a single dark moss material, so
the figure reads as a monochrome athlete silhouette rather than a textured
character. The clip is played continuously on loop; the mesh itself does not
translate (it is played in place).

Because every material is overridden at load time, the model's textures are
never sampled. They have therefore been removed, and Meshopt re-run on the
untextured document:

  gltf-transform meshopt athlete-untextured.glb athlete-jog.glb

Result: 917 kB — smaller than any textured variant measured:

  | variant                                   | size     |
  | ----------------------------------------- | -------- |
  | WebP 1024 px textures + Meshopt (previous)| 1.70 MB  |
  | KTX2 ETC1S q128 textures + Meshopt        | 1.76 MB  |
  | no textures + Meshopt (current)           | 917 kB   |

KTX2/Basis was evaluated and rejected on measurement: the 11 textures were
already WebP at 1024 px (about 780 kB in total), so ETC1S encoding plus its mip
chains came out larger than what it replaced, and it would additionally have
cost a ~150 kB transcoder download at runtime. Re-add textures only if the
figure is ever shown with its own materials; in that case use `uastc` for the
normal maps and attach `KTX2Loader` with a transcoder path alongside the Meshopt
decoder.
