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
                    pefinResponse: {
                        occurrenceDate: string;
                        legalNatureId: string;
                        legalNature: string;
                        contractId: string;
                        creditorName: string;
                        amount: number;
                        principal: boolean;
                        legalSquare: string;
                        dispute: {
                            disputeIndicativeFlag: boolean;
                        };
                        cadus: string;
                    }[];
                    summary: {
                        count: number;
                        balance: number;
                        firstOccurrence: string;
                        lastOccurrence: string;
                    };
                };
                refin: {
                    refinResponse: any[];
                    summary: {
                        count: number;
                        balance: number;
                    };
                };
                notary: {
                    notaryResponse: any[];
                    summary: {
                        count: number;
                        balance: number;
                    };
                };
                check: {
                    checkResponse: any[];
                    summary: {
                        count: number;
                        balance: number;
                    };
                };
                collectionRecords: {
                    collectionRecordsResponse: any[];
                    summary: {
                        count: number;
                        balance: number;
                    };
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
                    summary: {
                        count: number;
                    };
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
                    summary: {
                        count: number;
                        balance: number;
                    };
                };
                judgementFilings: {
                    judgementFilingsResponse: any[];
                    summary: {
                        count: number;
                        balance: number;
                    };
                };
                bankrupts: {
                    bankruptsResponse: any[];
                    summary: {
                        count: number;
                        balance: number;
                    };
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
        }
    }


}

export default ServicesAnalisando