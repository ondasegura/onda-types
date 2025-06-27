import z4 from "zod/v4";


namespace ServicesAnalisando {
    export namespace Token {
        export const TokenOutputSchema = z4.object({
            status: z4.number().int(),
            code: z4.literal("SUCCESS"),
            type: z4.literal("success"),
            message: z4.string(),
            count: z4.number().int(),
            results: z4.object({
                token: z4.string()
            })
        });

        export type Output = z4.infer<typeof TokenOutputSchema>;
    }

    export namespace ConsultaSerasa {

        export const inputSchema = z4.object({
            dadoPesquisado: z4.string(),
            Cod: z4.union([
                z4.literal("4"),
                z4.literal("5"),
            ]), // 4 para cpf e 5 para cnpj
            apiValueType: z4.union([
                z4.literal("cpfcompleto"),
                z4.literal("cnpjcompleto")],
            ),// cpfcompleto ou cnpjcompleto
        })

        export const OutputSchema = z4.object({
            status: z4.number().optional().nullable(),
            code: z4.string().optional().nullable(),
            type: z4.string().optional().nullable(),
            message: z4.string().optional().nullable(),
            count: z4.number().optional().nullable(),
            results_new: z4.object({
                consulta: z4.object({
                    servicesId: z4.string().optional().nullable(),
                    servicesTag: z4.string().optional().nullable(),
                    isApiService: z4.boolean().optional().nullable(),
                    status: z4.string().optional().nullable(),
                    result: z4.object({
                        Cod: z4.string().optional().nullable(),
                        jsonData: z4.object({
                            reports: z4.array(
                                z4.object({
                                    reportName: z4.string(),
                                    identificationReport: z4.object({
                                        updateDate: z4.string().optional().nullable(),
                                        documentNumber: z4.string().optional().nullable(),
                                        statusRegistration: z4.string().optional().nullable(),
                                        statusCode: z4.string().optional().nullable(),
                                        statusCodeDescription: z4.string().optional().nullable(),
                                        companyName: z4.string().optional().nullable(),
                                        companyAlias: z4.string().optional().nullable(),
                                        address: z4.object({
                                            addressLine: z4.string().optional().nullable(),
                                            zipCode: z4.string().optional().nullable(),
                                            district: z4.string().optional().nullable(),
                                            city: z4.string().optional().nullable(),
                                            state: z4.string().optional().nullable(),
                                        }).optional().nullable(),
                                        companyUrl: z4.string().optional().nullable(),
                                        partnership: z4.string().optional().nullable(),
                                        companyRegister: z4.string().optional().nullable(),
                                        companyRegisterDate: z4.string().optional().nullable(),
                                        companyFoundation: z4.string().optional().nullable(),
                                        numberEmployees: z4.number().optional().nullable(),
                                        economicActivity: z4.string().optional().nullable(),
                                        importPurchases: z4.number().optional().nullable(),
                                        exportSales: z4.number().optional().nullable(),
                                        cnae: z4.string().optional().nullable(),
                                        serasaActiveCode: z4.string().optional().nullable(),
                                        nireNumber: z4.string().optional().nullable(),
                                        predecessorList: z4.array(z4.unknown()).optional().nullable(),
                                        reorganizations: z4.array(z4.unknown()).optional().nullable(),
                                        legalNatureCode: z4.string().optional().nullable(),
                                    }).optional().nullable(),
                                    QSAReport: z4.object({
                                        companyData: z4.object({
                                            socialCapitalValue: z4.number().optional().nullable(),
                                            accomplishedValue: z4.number().optional().nullable(),
                                            informationUpdateDate: z4.string().optional().nullable(),
                                            countryOrigin: z4.string().optional().nullable(),
                                            controlType: z4.string().optional().nullable(),
                                            nature: z4.string().optional().nullable(),
                                        }).optional().nullable(),
                                        partnerCompleteReport: z4.object({
                                            partnersList: z4.array(
                                                z4.object({
                                                    documentType: z4.string().optional().nullable(),
                                                    documentId: z4.string().optional().nullable(),
                                                    name: z4.string().optional().nullable(),
                                                    sinceDate: z4.string().optional().nullable(),
                                                    nationality: z4.string().optional().nullable(),
                                                    restrictionSign: z4.boolean().optional().nullable(),
                                                    documentConsistency: z4.boolean().optional().nullable(),
                                                    capitalTotalValue: z4.number().optional().nullable(),
                                                    capitalVoterValue: z4.number().optional().nullable(),
                                                })
                                            ).optional().nullable(),
                                        }).optional().nullable(),
                                        directorCompleteReport: z4.object({
                                            directorsList: z4.array(
                                                z4.object({
                                                    documentType: z4.string().optional().nullable(),
                                                    documentId: z4.string().optional().nullable(),
                                                    name: z4.string().optional().nullable(),
                                                    role: z4.string().optional().nullable(),
                                                    sinceDate: z4.string().optional().nullable(),
                                                    nationality: z4.string().optional().nullable(),
                                                    maritalStatus: z4.string().optional().nullable(),
                                                    restrictionSign: z4.boolean().optional().nullable(),
                                                    documentConsistency: z4.boolean().optional().nullable(),
                                                    informationUpdateDate: z4.string().optional().nullable(),
                                                })
                                            ).optional().nullable(),
                                        }).optional().nullable(),
                                    }).optional().nullable(),
                                    negativeData: z4.object({
                                        pefin: z4.object({
                                            summary: z4.object({
                                                count: z4.number().optional().nullable(),
                                                balance: z4.number().optional().nullable(),
                                            }).optional().nullable(),
                                        }).optional().nullable(),
                                        refin: z4.object({
                                            summary: z4.object({
                                                count: z4.number().optional().nullable(),
                                                balance: z4.number().optional().nullable(),
                                            }).optional().nullable(),
                                        }).optional().nullable(),
                                        collectionRecords: z4.object({
                                            summary: z4.object({
                                                count: z4.number().optional().nullable(),
                                                balance: z4.number().optional().nullable(),
                                            }).optional().nullable(),
                                        }).optional().nullable(),
                                        check: z4.object({
                                            summary: z4.object({
                                                count: z4.number().optional().nullable(),
                                                balance: z4.number().optional().nullable(),
                                            }).optional().nullable(),
                                        }).optional().nullable(),
                                        notary: z4.object({
                                            summary: z4.object({
                                                count: z4.number().optional().nullable(),
                                                balance: z4.number().optional().nullable(),
                                            }).optional().nullable(),
                                        }).optional().nullable(),
                                    }).optional().nullable(),
                                    facts: z4.object({
                                        judgementFilings: z4.object({
                                            summary: z4.object({
                                                count: z4.number().optional().nullable(),
                                                balance: z4.number().optional().nullable(),
                                            }).optional().nullable(),
                                        }).optional().nullable(),
                                        bankrupts: z4.object({
                                            summary: z4.object({
                                                count: z4.number().optional().nullable(),
                                                balance: z4.number().optional().nullable(),
                                            }).optional().nullable(),
                                        }).optional().nullable(),
                                        inquiryCompanyResponse: z4.object({
                                            results: z4.array(
                                                z4.object({
                                                    occurrenceDate: z4.string().optional().nullable(),
                                                    companyName: z4.string().optional().nullable(),
                                                    companyDocumentId: z4.string().optional().nullable(),
                                                    companyAlias: z4.string().optional().nullable(),
                                                    daysQuantity: z4.number().optional().nullable(),
                                                })
                                            ).optional().nullable(),
                                            quantity: z4.object({
                                                actual: z4.number().optional().nullable(),
                                                historical: z4.array(
                                                    z4.object({
                                                        inquiryDate: z4.string().optional().nullable(),
                                                        occurrences: z4.number().optional().nullable(),
                                                    })
                                                ).optional().nullable(),
                                            }).optional().nullable(),
                                        }).optional().nullable(),
                                    }).optional().nullable(),
                                    score: z4.object({
                                        scoreModel: z4.string().optional().nullable(),
                                        codeMessage: z4.number().optional().nullable(),
                                        message: z4.string().optional().nullable(),
                                    }).optional().nullable(),
                                    scores: z4.object({
                                        scoreResponse: z4.array(
                                            z4.object({
                                                scoreModel: z4.string().optional().nullable(),
                                                message: z4.string().optional().nullable(),
                                                billing: z4.boolean().optional().nullable(),
                                            })
                                        ).optional().nullable(),
                                    }).optional().nullable(),
                                })
                            ),
                        }),
                    }),
                    providedData: z4.string().optional().nullable(),
                    userId: z4.string().optional().nullable(),
                    createDate: z4.string().optional().nullable(),
                    updateDate: z4.string().optional().nullable(),
                    previousServiceId: z4.any().optional().nullable(),
                    _id: z4.string().optional().nullable(),
                    __v: z4.number().optional().nullable(),
                }),
                transacao: z4.object({
                    _id: z4.string().optional().nullable(),
                    userId: z4.string().optional().nullable(),
                    status: z4.string().optional().nullable(),
                    category: z4.string().optional().nullable(),
                    methodPayment: z4.string().optional().nullable(),
                    amount: z4.number().optional().nullable(),
                    dateStartTransaction: z4.string().optional().nullable(),
                    dateFinishedTransaction: z4.any().optional().nullable(),
                    type: z4.string().optional().nullable(),
                    isPositive: z4.boolean().optional().nullable(),
                    motive: z4.string().optional().nullable(),
                    matrix: z4.string().optional().nullable(),
                    createDate: z4.string().optional().nullable(),
                    updateDate: z4.string().optional().nullable(),
                    __v: z4.number().optional().nullable(),
                }).optional().nullable(),
            }),
        });

        export type Input = z4.infer<typeof inputSchema>

        export type Output = z4.infer<typeof OutputSchema>
    }
}

export default ServicesAnalisando