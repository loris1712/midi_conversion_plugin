{
  "targets": [
    {
      "target_name": "MuseClientSdk",
      "sources": [ "MuseClientSdk_addon.cpp" ],
      "include_dirs": [
        "<(module_root_dir)/MuseClientSDK/include/",
      ],
      "conditions": [
        [
          "OS==\"win\"",
          {
            "libraries": [
              "<(module_root_dir)/MuseClientSDK/bin/win64/MuseClientSdk.1.0.2.lib"
            ],
            "product_dir": "<(module_root_dir)/win",
            "msvs_settings": {
              "VCCLCompilerTool": {
                "AdditionalOptions": []
              }
            }
          }
        ],
        [
          "OS==\"mac\"",
          {
            "product_dir": "<(module_root_dir)/mac",
            "libraries": [
              "<(module_root_dir)/MuseClientSDK/bin/macos_universal/libMuseClientSdk.1.0.2.dylib"
            ],
            "copies": [
              {
                "destination": "<(module_root_dir)/mac",
                "files": ["<(module_root_dir)/MuseClientSDK/bin/macos_universal/libMuseClientSdk.1.0.2.dylib"]
              }
            ],
            "xcode_settings": {
              "OTHER_CFLAGS": [
                "-arch x86_64",
                "-arch arm64"
              ],
              "OTHER_LDFLAGS": ["-Wl,-rpath,@loader_path/",
                "-arch x86_64", "-arch arm64",
                "-s", "-Wl,-S" # stripping
                ]
            }
          }
        ]
      ]
    }
  ]
}
