import z4 from "zod/v4";


namespace ServicesAnalisando {
    export namespace Token {
        export const CriarSchema = z4.object({
            status: z4.number().int(),
            code: z4.literal("SUCCESS"),
            type: z4.literal("success"),
            message: z4.string(),
            count: z4.number().int(),
            results: z4.object({
                token: z4.string()
            })
        });

        export type Output = z4.infer<typeof CriarSchema>;
    }

    export namespace RelatorioAvancadoTopScorePFPME {
        export interface Input {
            userId: string;
            dadoPesquisado: string;
            tipoModalidade: string;
            Cod: string;
            servicesTag: string;
            servicesId: string;
            apiValueType: string;
        };

        export interface Output {
            status: number;
            code: string;
            type: string;
            message: string;
            count: number;
            results: {
                servicesId?: string;
                servicesTag?: string;
                isApiService?: boolean;
                status: string;
                result?: {
                    Cod: string;
                    jsonData: {
                        reports: {
                            reportName: string;
                            registration: {
                                documentNumber: string;
                                consumerName: string;
                                motherName: string;
                                consumerGender: string;
                                birthDate: string;
                                statusRegistration: string;
                                statusDate: string;
                                consumerGenderDescription: string;
                                address: {
                                    addressLine: string;
                                    district: string;
                                    zipCode: string;
                                    country: string;
                                    city: string;
                                    state: string;
                                };
                                addresses: {
                                    addressLine: string;
                                    addressTypeCode: number;
                                    addressTypeDescription: string;
                                    addressNumber: string;
                                    district: string;
                                    zipCode: string;
                                    country: string;
                                    city: string;
                                    state: string;
                                    addressComplement: string;
                                    updateDate: string;
                                }[];
                                phones: {
                                    regionCode: number;
                                    areaCode: number;
                                    phoneNumber: number;
                                    phoneType: string;
                                    phoneTypeCode: number;
                                    updateDate: string;
                                }[];
                            };
                            negativeData: {
                                pefin: {
                                    pefinResponse: any[];
                                    summary: { count: number; balance: number };
                                };
                                refin: {
                                    refinResponse: any[];
                                    summary: { count: number; balance: number };
                                };
                                notary: {
                                    notaryResponse: any[];
                                    summary: { count: number; balance: number };
                                };
                                check: {
                                    checkResponse: any[];
                                    summary: { count: number; balance: number };
                                };
                                collectionRecords: {
                                    collectionRecordsResponse: any[];
                                    summary: { count: number; balance: number };
                                };
                            };
                            score: {
                                score: number;
                                scoreModel: string;
                                range: string;
                                defaultRate: string;
                                codeMessage: number;
                                message: string;
                            };
                            facts: {
                                inquiry: {
                                    inquiryResponse: {
                                        occurrenceDate: string;
                                        segmentDescription: string;
                                        daysQuantity: number;
                                    }[];
                                    summary: { count: number };
                                };
                                inquirySummary: {
                                    inquiryQuantity: {
                                        actual: number;
                                        checkActual: number;
                                        creditInquiriesQuantity: {
                                            inquiryDate: string;
                                            occurrences: number;
                                            bankOccurrences: number;
                                            companyOccurrences: number;
                                        }[];
                                        checkInquiriesQuantity: {
                                            inquiryDate: string;
                                            occurrences: number;
                                        }[];
                                    };
                                    summary: {
                                        count: number;
                                        checkCount: number;
                                        creditCount: number;
                                    };
                                };
                                stolenDocuments: {
                                    stolenDocumentsResponse: any[];
                                    summary: { count: number; balance: number };
                                };
                                judgementFilings: {
                                    judgementFilingsResponse: any[];
                                    summary: { count: number; balance: number };
                                };
                                bankrupts: {
                                    bankruptsResponse: any[];
                                    summary: { count: number; balance: number };
                                };
                            };
                            partner: {
                                partnershipResponse: {
                                    businessDocument: string;
                                    companyName: string;
                                    participationPercentage: number;
                                    companyStatus: string;
                                    companyStatusCode: string;
                                    companyState: string;
                                    companyStatusDate: string;
                                    updateDate: string;
                                    participationInitialDate: string;
                                    hasNegative: boolean;
                                }[];
                                summary: {
                                    count: number;
                                    balance: number;
                                };
                            };
                            attributes: {
                                attributesResponse: {
                                    scoring: number;
                                    attributeModel: string;
                                    codeMessage: number;
                                    message: string;
                                }[];
                            };
                        }[];
                    };
                };
                providedData?: string;
                userId: string;
                createDate: string;
                updateDate: string;
                previousServiceId?: string | null;
                _id: string;
                __v: number;
                // Para o segundo objeto:
                category?: string;
                methodPayment?: string;
                amount?: number;
                dateStartTransaction?: string;
                dateFinishedTransaction?: string | null;
                type?: string;
                isPositive?: boolean;
                motive?: string;
                matrix?: string;
            }[]
        }
    }


}

export default ServicesAnalisando