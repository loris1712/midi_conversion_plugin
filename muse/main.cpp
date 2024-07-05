/*
* MuseClientSdk preview example.
* Copyright 2024 Muse. All rights reserved.
*
* Use, distribution and modification of this code and associated binaries is subject to license.
*
* This is a simple example demonstrating how to connect to the Muse Hub and retrieve some information.
*/

#include <iostream>

#include "MuseClientSdkApi.h"

int main()
{
    // Initiate connection to the MuseHub client.
    MuseSdk_Handle handle = nullptr;
    auto st = MuseSdk_initialize("provided-partner-identifier", &handle);

    if ((st == MuseSdk_Status_SUCCESS) && handle) {
        // Connection succeeded

        // Read UUID
        MuseSdk_UserInfo* user_info = nullptr;
        st = MuseSdk_getUserInfo(handle, &user_info);

        if ((st == MuseSdk_Status_SUCCESS) && user_info) {
            // If connected to the Hub, this should normally succeed.
            if (user_info->uuid)
                std::cout << "UUID: " << user_info->uuid << std::endl;

            MuseSdk_releaseUserInfo(&user_info);
        }
        else {
            std::cout << "Did not retrieve UUID" << std::endl;
        }

        // Read SKU manually assigned to the product in Cosmos
        MuseSdk_Sku* sku = nullptr;
        st = MuseSdk_getSku(handle, &sku);

        if ((st == MuseSdk_Status_SUCCESS) && sku) {
            if (sku->sku)
                std::cout << "SKU: " << sku->sku << std::endl;

            MuseSdk_releaseSku(&sku);
        }
        else {
            std::cout << "Did not retrieve SKU" << std::endl;
        }

        // Read subscription option
        MuseSdk_SubscriptionOption* sub_info = nullptr;
        st = MuseSdk_getSubscriptionOption(handle, &sub_info);

        if ((st == MuseSdk_Status_SUCCESS) && sub_info) {
            // This field exists if manually assigned to the current product option in Cosmos
            if (sub_info->assigned_id)
                std::cout << "Subscription option: " << sub_info->assigned_id << std::endl;

            MuseSdk_releaseSubscriptionOption(&sub_info);
        }
        else {
            std::cout << "Did not retrieve subscription info" << std::endl;
        }

        // Release connection and free associated resources
        MuseSdk_finalize(&handle);
    }
    else {
        // Muse Hub not running or connection timeout.
        std::cout << "Did not connect to Muse Hub" << std::endl;
    }

    return 0;
}
