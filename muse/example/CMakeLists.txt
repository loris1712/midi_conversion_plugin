cmake_minimum_required(VERSION 3.5)

project(MuseClientSdkExample)

add_executable(MuseClientSdkExample main.cpp ${PROJECT_SOURCE_DIR}/../include/MuseClientSdkApi.h)
target_include_directories(MuseClientSdkExample PRIVATE ${PROJECT_SOURCE_DIR}/../include/)

if(WIN32)

# Import library + DLL
target_link_libraries(MuseClientSdkExample PRIVATE ${PROJECT_SOURCE_DIR}/../bin/win64/MuseClientSdk.lib)

# Let the example find the DLL. In a real use case, the DLL will be made available in the system PATH by the Muse Hub.
add_custom_command(
  TARGET MuseClientSdkExample POST_BUILD
  COMMAND ${CMAKE_COMMAND} -E copy_if_different "${PROJECT_SOURCE_DIR}/../bin/win64/MuseClientSdk.dll" "$<TARGET_FILE_DIR:MuseClientSdkExample>/MuseClientSdk.dll"
  DEPENDS "../bin/win64/MuseClientSdk.dll"
  COMMENT "Copying SDK DLL to output directory"
)


else()

target_link_libraries(MuseClientSdkExample PRIVATE ${PROJECT_SOURCE_DIR}/../bin/macos_universal/libMuseClientSdk.dylib)

endif()
