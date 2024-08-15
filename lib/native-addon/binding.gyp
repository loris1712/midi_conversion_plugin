{
  "targets": [
    {
      "target_name": "native",
      "sources": [ "native.cc" ],
      "defines": ["NAPI_CPP_EXCEPTIONS"], 
      "cflags!": ["-fno-exceptions"],
      "cflags": ["-Wall", "-Wno-psabi", "-std=c++14", "-pthread"], 
      "include_dirs": [                                                                        
        "<!(node -p \"require('node-addon-api').include_dir\")",         
        "../node_modules/node-addon-api",                                                    
        "node_modules/node-addon-api",                                                       
        "/usr/include/node",                                                                 
        "/usr/local/include/node",                                                           
    ], 
       "cflags_cc!": ["-fno-exceptions"],
      "cflags_cc": [ "-std=c++14" ],
      "conditions": [
        ["OS=='mac'", {
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
        }]
      ],
    "dependencies": ["<!(node -p \"require('node-addon-api').gyp\")"],   

    }
  ]
}
