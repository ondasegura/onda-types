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

        const StatusApiSchema = z4.union([
            z4.literal(201),
            z4.literal(500),
            z4.literal(404)
        ]);


        export interface Input {
            userId: string;
            dadoPesquisado: string;
            tipoModalidade: string;
            Cod: string;
            servicesTag: string;
            servicesId: string;
            apiValueType: string;
        };

        export const OutputSchema = z4.object({
            status: StatusApiSchema,
            code: z4.string().nullable().optional(),
            type: z4.string().nullable().optional(),
            message: z4.string().nullable().optional(),
            count: z4.number().nullable().optional(),
            results: z4.array(
                z4.object({
                    servicesId: z4.string().nullable().optional(),
                    servicesTag: z4.string().nullable().optional(),
                    isApiService: z4.boolean().nullable().optional(),
                    status: z4.string().nullable().optional(),
                    result: z4.object({
                        Cod: z4.string().nullable().optional(),
                        jsonData: z4.object({
                            reports: z4.array(
                                z4.object({
                                    reportName: z4.string(),
                                    registration: z4.object({
                                        documentNumber: z4.string(),
                                        consumerName: z4.string(),
                                        motherName: z4.string(),
                                        consumerGender: z4.string(),
                                        birthDate: z4.string(),
                                        statusRegistration: z4.string(),
                                        statusDate: z4.string(),
                                        consumerGenderDescription: z4.string(),
                                        address: z4.object({
                                            addressLine: z4.string(),
                                            district: z4.string(),
                                            zipCode: z4.string(),
                                            country: z4.string(),
                                            city: z4.string(),
                                            state: z4.string(),
                                        }).nullable().optional(),
                                        addresses: z4.array(
                                            z4.object({
                                                addressLine: z4.string(),
                                                addressTypeCode: z4.number(),
                                                addressTypeDescription: z4.string(),
                                                addressNumber: z4.string(),
                                                district: z4.string(),
                                                zipCode: z4.string(),
                                                country: z4.string(),
                                                city: z4.string(),
                                                state: z4.string(),
                                                addressComplement: z4.string(),
                                                updateDate: z4.string(),
                                            })
                                        ).nullable().optional(),
                                        phones: z4.array(
                                            z4.object({
                                                regionCode: z4.number(),
                                                areaCode: z4.number(),
                                                phoneNumber: z4.number(),
                                                phoneType: z4.string(),
                                                phoneTypeCode: z4.number(),
                                                updateDate: z4.string(),
                                            })
                                        ).nullable().optional(),
                                    }).nullable().optional(),
                                    negativeData: z4.object({
                                        pefin: z4.object({
                                            pefinResponse: z4.array(z4.any()),
                                            summary: z4.object({
                                                count: z4.number(),
                                                balance: z4.number(),
                                            }),
                                        }).nullable().optional(),
                                        refin: z4.object({
                                            refinResponse: z4.array(z4.any()),
                                            summary: z4.object({
                                                count: z4.number(),
                                                balance: z4.number(),
                                            }),
                                        }).nullable().optional(),
                                        notary: z4.object({
                                            notaryResponse: z4.array(z4.any()),
                                            summary: z4.object({
                                                count: z4.number(),
                                                balance: z4.number(),
                                            }),
                                        }).nullable().optional(),
                                        check: z4.object({
                                            checkResponse: z4.array(z4.any()),
                                            summary: z4.object({
                                                count: z4.number(),
                                                balance: z4.number(),
                                            }),
                                        }).nullable().optional(),
                                        collectionRecords: z4.object({
                                            collectionRecordsResponse: z4.array(z4.any()),
                                            summary: z4.object({
                                                count: z4.number(),
                                                balance: z4.number(),
                                            }),
                                        }).nullable().optional(),
                                    }).nullable().optional(),
                                    score: z4.object({
                                        score: z4.number(),
                                        scoreModel: z4.string(),
                                        range: z4.string(),
                                        defaultRate: z4.string(),
                                        codeMessage: z4.number(),
                                        message: z4.string(),
                                    }).nullable().optional(),
                                    facts: z4.object({
                                        inquiry: z4.object({
                                            inquiryResponse: z4.array(
                                                z4.object({
                                                    occurrenceDate: z4.string(),
                                                    segmentDescription: z4.string(),
                                                    daysQuantity: z4.number(),
                                                })
                                            ),
                                            summary: z4.object({
                                                count: z4.number(),
                                            }),
                                        }),
                                        inquirySummary: z4.object({
                                            inquiryQuantity: z4.object({
                                                actual: z4.number(),
                                                checkActual: z4.number(),
                                                creditInquiriesQuantity: z4.array(
                                                    z4.object({
                                                        inquiryDate: z4.string(),
                                                        occurrences: z4.number(),
                                                        bankOccurrences: z4.number(),
                                                        companyOccurrences: z4.number(),
                                                    })
                                                ),
                                                checkInquiriesQuantity: z4.array(
                                                    z4.object({
                                                        inquiryDate: z4.string(),
                                                        occurrences: z4.number(),
                                                    })
                                                ),
                                            }),
                                            summary: z4.object({
                                                count: z4.number(),
                                                checkCount: z4.number(),
                                                creditCount: z4.number(),
                                            }),
                                        }),
                                        stolenDocuments: z4.object({
                                            stolenDocumentsResponse: z4.array(z4.any()),
                                            summary: z4.object({
                                                count: z4.number(),
                                                balance: z4.number(),
                                            }),
                                        }),
                                        judgementFilings: z4.object({
                                            judgementFilingsResponse: z4.array(z4.any()),
                                            summary: z4.object({
                                                count: z4.number(),
                                                balance: z4.number(),
                                            }),
                                        }),
                                        bankrupts: z4.object({
                                            bankruptsResponse: z4.array(z4.any()),
                                            summary: z4.object({
                                                count: z4.number(),
                                                balance: z4.number(),
                                            }),
                                        }),
                                    }).nullable().optional(),
                                    partner: z4.object({
                                        partnershipResponse: z4.array(
                                            z4.object({
                                                businessDocument: z4.string(),
                                                companyName: z4.string(),
                                                participationPercentage: z4.number(),
                                                companyStatus: z4.string(),
                                                companyStatusCode: z4.string(),
                                                companyState: z4.string(),
                                                companyStatusDate: z4.string(),
                                                updateDate: z4.string(),
                                                participationInitialDate: z4.string(),
                                                hasNegative: z4.boolean(),
                                            })
                                        ),
                                        summary: z4.object({
                                            count: z4.number(),
                                            balance: z4.number(),
                                        }),
                                    }).nullable().optional(),
                                    attributes: z4.object({
                                        attributesResponse: z4.array(
                                            z4.object({
                                                scoring: z4.number(),
                                                attributeModel: z4.string(),
                                                codeMessage: z4.number(),
                                                message: z4.string(),
                                            })
                                        ),
                                    }).nullable().optional(),
                                })
                            ),
                        }),
                    }),
                    providedData: z4.string().nullable().optional(),
                    userId: z4.string().nullable().optional(),
                    createDate: z4.string().nullable().optional(),
                    updateDate: z4.string().nullable().optional(),
                    previousServiceId: z4.string().nullable().optional(),
                    _id: z4.string().nullable().optional(),
                    __v: z4.number().nullable().optional(),
                    category: z4.string().nullable().optional(),
                    methodPayment: z4.string().nullable().optional(),
                    amount: z4.number().nullable().optional().nullable().optional(),
                    dateStartTransaction: z4.string().nullable().optional(),
                    dateFinishedTransaction: z4.string().nullable().optional(),
                    type: z4.string().nullable().optional(),
                    isPositive: z4.boolean().nullable().optional(),
                    motive: z4.string().nullable().optional(),
                    matrix: z4.string().nullable().optional(),
                })
            ),
        });

        export type Output = z4.infer<typeof OutputSchema>;
    }


}

export default ServicesAnalisando