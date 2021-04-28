export let sampleData = {
    /** 付款 */
    Payment: {
        "type": "Paypal", "amount": 89,
        "feeamt": "3.77",
        "address": {
            "Email": null, "ZipCode": "525011",
            "CityName": "茂名", "LastName": "Mai",
            "Phonenum": "18502146746",
            "FirstName": "Shu", "CountryName": "Aland Islands",
            "UserAddress": "油城三路267号大院402房",
            "ProvinceName": null, "CountryAbbreviation": null,
            "ProvinceAbbreviation": null
        },
        "freight": 0, "orderId": "ffe80129-d450-41c8-bb19-282d3eb56e49",
        "freightId": "",
        "freightName": "", "currencyCode": "USD",
        "applicationId": "7bbfa36c-8115-47ad-8d47-9e52b58e7efd",
        "transactionId": "3C315746MA058064S",
        "collectionAccount": "xiaobai@qq.com"
    },
    /** 订单已支付 */
    OrderPaid: {
        "order": {
            "Id": "de6441d9-0e87-452f-b728-2463337dc738", "Sum": 222,
            "Data": {
                "ReceiptInfo": {
                    "Id": "c0f925eb-e4df-4373-9d80-b1aaab4e8c2b", "Name": "Home",
                    "Phone": "18502146746", "CityId": null, "Mobile": null,
                    "Address": "油城三路267号大院402房", "CityName": "茂名", "CountyId": null,
                    "MemberId": "17047838-d210-4691-9aa6-4513eed2fdc7", "RegionId": "53922887-f2ef-2a24-f18b-dd249db563c5",
                    "Consignee": "Shu,Mai", "CountryId": "f601e5c1-f84a-a8a9-1f16-c7baec5b19af",
                    "IsDefault": false, "CountyName": null, "PostalCode": "525011",
                    "ProvinceId": "53922887-f2ef-2a24-f18b-dd249db563c5", "CountryName": "China",
                    "FullAddress": "China Ningxia 茂名  油城三路267号大院402房", "ProvinceName": "Ningxia",
                    "ApplicationId": "7bbfa36c-8115-47ad-8d47-9e52b58e7efd", "CreateDateTime": "2021-03-06T15:25:02"
                },
                "FreightSolutionId": "3b14d08d-ab58-4fcb-96e6-86de83da12c4"
            },
            "Amount": 194, "Remark": null, "Serial": null, "Status": "Send", "Freight": 28,
            "Invoice": null, "Discount": 0, "Consignee": "Shu,Mai", "OrderDate": null,
            "CustomerId": "17047838-d210-4691-9aa6-4513eed2fdc7", "StatusText": "已发货", "CouponTitle": "",
            "OrderDetails": [
                { "Id": "28b10cdc-a2d4-4ea8-bb6b-3fdf3db8e80e", "Unit": "件", "Price": 51, "Score": null, "Quantity": 2, "ImagePath": "/Images/Editor/1474dfde40c54dff9052066233b066a8_360_360.jpeg", "ProductId": "0964cb3b-1cd4-4894-830e-1b154b8bbf05", "ProductName": "十月妈咪维生素AD软胶囊" },
                { "Id": "a37c0680-8c11-4d4d-9352-2b7a446cbacb", "Unit": "件", "Price": 92, "Score": null, "Quantity": 1, "ImagePath": "/Images/Editor/3404892c83e543f7aaf35c8931398d6b_360_360.jpeg", "ProductId": "18ffa281-4532-47f3-bd7d-79fcce53ab4d", "ProductName": "关键速润糖片" }],
            "ApplicationId": "7bbfa36c-8115-47ad-8d47-9e52b58e7efd", "BalanceAmount": 0, "CouponDiscount": 0,
            "ReceiptAddress": "China Ningxia 茂名  油城三路267号大院402房 联系人：Shu,Mai 联系电话： 18502146746",
            "ReceiptRegionId": "53922887-f2ef-2a24-f18b-dd249db563c5"
        }
    },
    MerchantAuditSuccess: {
        "user": {
            "id": "5d513ed7-1e16-1138-9242-e100dcb171c8",
            "data": {
                "applicationId": "48e16c9a-9077-9e79-edbb-213b300d2bef"
            },
            "remark": "商家 KKKK",
            "create_date_time": "2021-04-21T00:07:59.406Z"
        },
        "merchant": {
            "id": "5d513ed7-1e16-1138-9242-e100dcb171c8", "email": "20@qq.com",
            "status": "audit-success", "contacts": "BBB", "companyName": "KKKK",
            "contactMobile": "18502146746", "createDateTime": "2021-04-21T00:07:33.000Z",
            "businessLicense": "67f73976-7047-b74d-5bb2-1c79aea5800a_800_1066"
        }
    },
    Retund: {
        "data": {
            "timeStamp": "2021-04-08T03:16:18Z", "currencyCode": "USD",
            "feeRefundAMT": "10.76", "refundStatus": "Instant",
            "pendingReason": "None", "grossRefundAMT": "276.00",
            "refundTransactionId": "5WH24864GN0530132"
        },
        "total": 276, "orderId": "24db19f1-bd0f-49c4-bb23-f4a32b0b746a",
        "orderDetails": [
            { "amount": 92, "quantity": 3, "productId": "18ffa281-4532-47f3-bd7d-79fcce53ab4d" }
        ]
    }
}