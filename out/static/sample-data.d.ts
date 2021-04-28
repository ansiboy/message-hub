export declare let sampleData: {
    /** 付款 */
    Payment: {
        type: string;
        amount: number;
        feeamt: string;
        address: {
            Email: null;
            ZipCode: string;
            CityName: string;
            LastName: string;
            Phonenum: string;
            FirstName: string;
            CountryName: string;
            UserAddress: string;
            ProvinceName: null;
            CountryAbbreviation: null;
            ProvinceAbbreviation: null;
        };
        freight: number;
        orderId: string;
        freightId: string;
        freightName: string;
        currencyCode: string;
        applicationId: string;
        transactionId: string;
        collectionAccount: string;
    };
    /** 订单已支付 */
    OrderPaid: {
        order: {
            Id: string;
            Sum: number;
            Data: {
                ReceiptInfo: {
                    Id: string;
                    Name: string;
                    Phone: string;
                    CityId: null;
                    Mobile: null;
                    Address: string;
                    CityName: string;
                    CountyId: null;
                    MemberId: string;
                    RegionId: string;
                    Consignee: string;
                    CountryId: string;
                    IsDefault: boolean;
                    CountyName: null;
                    PostalCode: string;
                    ProvinceId: string;
                    CountryName: string;
                    FullAddress: string;
                    ProvinceName: string;
                    ApplicationId: string;
                    CreateDateTime: string;
                };
                FreightSolutionId: string;
            };
            Amount: number;
            Remark: null;
            Serial: null;
            Status: string;
            Freight: number;
            Invoice: null;
            Discount: number;
            Consignee: string;
            OrderDate: null;
            CustomerId: string;
            StatusText: string;
            CouponTitle: string;
            OrderDetails: {
                Id: string;
                Unit: string;
                Price: number;
                Score: null;
                Quantity: number;
                ImagePath: string;
                ProductId: string;
                ProductName: string;
            }[];
            ApplicationId: string;
            BalanceAmount: number;
            CouponDiscount: number;
            ReceiptAddress: string;
            ReceiptRegionId: string;
        };
    };
    MerchantAuditSuccess: {
        user: {
            id: string;
            data: {
                applicationId: string;
            };
            remark: string;
            create_date_time: string;
        };
        merchant: {
            id: string;
            email: string;
            status: string;
            contacts: string;
            companyName: string;
            contactMobile: string;
            createDateTime: string;
            businessLicense: string;
        };
    };
    Retund: {
        data: {
            timeStamp: string;
            currencyCode: string;
            feeRefundAMT: string;
            refundStatus: string;
            pendingReason: string;
            grossRefundAMT: string;
            refundTransactionId: string;
        };
        total: number;
        orderId: string;
        orderDetails: {
            amount: number;
            quantity: number;
            productId: string;
        }[];
    };
};
