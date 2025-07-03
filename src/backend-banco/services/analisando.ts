import z4 from "zod/v4";


namespace ServicesAnalisando {
    export namespace Token {
        export const OutputSchema = z4.object({
            status: z4.number().int(),
            code: z4.literal("SUCCESS"),
            type: z4.literal("success"),
            message: z4.string(),
            count: z4.number().int(),
            results: z4.object({
                token: z4.string()
            })
        });

        export type Output = z4.infer<typeof OutputSchema>;
    }

    export namespace ConsultaSerasa {

        export const InputSchema = z4.object({
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

        const set_summary = z4.object({
            count: z4.number().optional().nullable(),
            checkCount: z4.number().optional().nullable(),
            creditCount: z4.number().optional().nullable(),
            bankCount: z4.number().optional().nullable(),
            companyCount: z4.number().optional().nullable(),
            balance: z4.number().optional().nullable(),
            firstOccurrence: z4.string().optional().nullable(),
            lastOccurrence: z4.string().optional().nullable(),
            message: z4.string().optional().nullable(),
        }).optional().nullable()

        export const OutputSchemaSalvo = z4.object({
            reportName: z4.string(),
            registration: z4.object({
                phones: z4.array(z4.object({
                    areaCode: z4.number().optional().nullable(),
                    phoneType: z4.string().optional().nullable(),
                    regionCode: z4.number().optional().nullable(),
                    updateDate: z4.string().optional().nullable(),
                    phoneNumber: z4.number().optional().nullable(),
                    phoneTypeCode: z4.number().optional().nullable(),
                })).optional().nullable(),
                address: z4.object({
                    city: z4.string().optional().nullable(),
                    state: z4.string().optional().nullable(),
                    country: z4.string().optional().nullable(),
                    zipCode: z4.string().optional().nullable(),
                    district: z4.string().optional().nullable(),
                    addressLine: z4.string().optional().nullable(),
                }).optional().nullable(),
                addresses: z4.array(z4.object({
                    city: z4.string().optional().nullable(),
                    state: z4.string().optional().nullable(),
                    country: z4.string().optional().nullable(),
                    zipCode: z4.string().optional().nullable(),
                    district: z4.string().optional().nullable(),
                    updateDate: z4.string().optional().nullable(),
                    addressLine: z4.string().optional().nullable(),
                    addressNumber: z4.string().optional().nullable(),
                    addressTypeCode: z4.number().optional().nullable(),
                    addressComplement: z4.string().optional().nullable(),
                    addressTypeDescription: z4.string().optional().nullable(),
                })).optional().nullable(),
                birthDate: z4.string().optional().nullable(),
                motherName: z4.string().optional().nullable(),
                statusDate: z4.string().optional().nullable(),
                consumerName: z4.string().optional().nullable(),
                consumerGender: z4.string().optional().nullable(),
                documentNumber: z4.string().optional().nullable(),
                statusRegistration: z4.string().optional().nullable(),
                consumerGenderDescription: z4.string().optional().nullable(),
            }).optional().nullable(),
            // partner VISTORIADO OK
            partner: z4.object({
                summary: set_summary,
                partnershipResponse: z4.array(z4.object({
                    businessDocument: z4.string().optional().nullable(),
                    companyName: z4.string().optional().nullable(),
                    participationPercentage: z4.number().optional().nullable(),
                    companyStatus: z4.string().optional().nullable(),
                    companyStatusCode: z4.string().optional().nullable(),
                    companyState: z4.string().optional().nullable(),
                    companyStatusDate: z4.string().optional().nullable(),
                    updateDate: z4.string().optional().nullable(),
                    participationInitialDate: z4.string().optional().nullable(),
                    hasNegative: z4.boolean().optional().nullable(),
                })).optional().nullable(),
            }).optional().nullable(),
            // attributes VISTORIADO OK
            attributes: z4.object({
                attributesResponse: z4.array(z4.object({
                    message: z4.string().optional().nullable(),
                    scoring: z4.number().optional().nullable(),
                    codeMessage: z4.number().optional().nullable(),
                    attributeModel: z4.string().optional().nullable(),
                })).optional().nullable(),
            }).optional().nullable(),
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
            // negativeData VISTORIADO OK
            negativeData: z4.object({
                check: z4.object({
                    summary: set_summary,
                    checkResponse: z4.array(z4.object({
                        city: z4.string().optional().nullable(),
                        cadus: z4.string().optional().nullable(),
                        alinea: z4.number().optional().nullable(),
                        bankId: z4.number().optional().nullable(),
                        bankName: z4.string().optional().nullable(),
                        checkCount: z4.number().optional().nullable(),
                        checkNumber: z4.string().optional().nullable(),
                        federalUnit: z4.string().optional().nullable(),
                        legalSquare: z4.string().optional().nullable(),
                        bankAgencyId: z4.number().optional().nullable(),
                        occurrenceDate: z4.string().optional().nullable(),
                    })).optional().nullable(),
                }).optional().nullable(),
                pefin: z4.object({
                    summary: set_summary,
                    pefinResponse: z4.array(z4.object({
                        cadus: z4.string().optional().nullable(),
                        amount: z4.number().optional().nullable(),
                        dispute: z4.object({
                            disputeIndicativeFlag: z4.boolean().optional().nullable(),
                        }).optional().nullable(),
                        principal: z4.boolean().optional().nullable(),
                        contractId: z4.string().optional().nullable(),
                        legalNature: z4.string().optional().nullable(),
                        legalSquare: z4.string().optional().nullable(),
                        creditorName: z4.string().optional().nullable(),
                        legalNatureId: z4.string().optional().nullable(),
                        occurrenceDate: z4.string().optional().nullable(),
                    })).optional().nullable(),
                }).optional().nullable(),
                refin: z4.object({
                    summary: set_summary,
                    refinResponse: z4.array(z4.object({
                        cadus: z4.string().optional().nullable(),
                        amount: z4.number().optional().nullable(),
                        principal: z4.boolean().optional().nullable(),
                        contractId: z4.string().optional().nullable(),
                        legalNature: z4.string().optional().nullable(),
                        legalSquare: z4.string().optional().nullable(),
                        creditorName: z4.string().optional().nullable(),
                        legalNatureId: z4.string().optional().nullable(),
                        occurrenceDate: z4.string().optional().nullable(),
                    })).optional().nullable(),
                }).optional().nullable(),
                notary: z4.object({
                    summary: set_summary,
                    notaryResponse: z4.array(z4.object({
                        city: z4.string().optional().nullable(),
                        cadus: z4.string().optional().nullable(),
                        amount: z4.number().optional().nullable(),
                        dispute: z4.object({
                            disputeIndicativeFlag: z4.boolean().optional().nullable(),
                        }).optional().nullable(),
                        federalUnit: z4.string().optional().nullable(),
                        legalSquare: z4.string().optional().nullable(),
                        officeNumber: z4.string().optional().nullable(),
                        occurrenceDate: z4.string().optional().nullable(),
                    })).optional().nullable(),
                }).optional().nullable(),
                collectionRecords: z4.object({
                    summary: set_summary,
                    collectionRecordsResponse: z4.array(z4.object({
                        occurrenceDate: z4.string().optional().nullable(),
                        legalNatureId: z4.string().optional().nullable(),
                        legalNature: z4.string().optional().nullable(),
                        contractId: z4.string().optional().nullable(),
                        creditorName: z4.string().optional().nullable(),
                        amount: z4.number().optional().nullable(),
                        city: z4.string().optional().nullable(),
                        federalUnit: z4.string().optional().nullable(),
                        legalSquare: z4.string().optional().nullable(),
                        principal: z4.boolean().optional().nullable(),
                    })).optional().nullable(),
                }).optional().nullable(),


            }).optional().nullable(),
            // facts VISTORIADO OK
            facts: z4.object({
                // inquiry ok
                // inquirySummary ok
                // stolenDocuments ok
                // spcInquires ok
                // inquiriesSegments ok
                // inquiriesSegmentsMonthly ok
                // spcInquiriesSegments ok
                // judgementFilings ok
                // bankrupts ok
                // spcInquirySummary ok
                inquiry: z4.object({
                    inquiryResponse: z4.array(z4.object({
                        occurrenceDate: z4.string().optional().nullable(),
                        segmentDescription: z4.string().optional().nullable(),
                        daysQuantity: z4.number().optional().nullable(),
                    })).optional().nullable(),
                    summary: set_summary,
                }).optional().nullable(),
                inquirySummary: z4.object({
                    inquiryQuantity: z4.object({
                        actual: z4.number().optional().nullable(),
                        checkActual: z4.number().optional().nullable(),
                        bankActual: z4.number().optional().nullable(),
                        companyActual: z4.number().optional().nullable(),
                        creditInquiriesQuantity: z4.array(z4.object({
                            inquiryDate: z4.string().optional().nullable(),
                            occurrences: z4.number().optional().nullable(),
                            bankOccurrences: z4.number().optional().nullable(),
                            companyOccurrences: z4.number().optional().nullable(),
                        })).optional().nullable(),
                        checkInquiriesQuantity: z4.array(z4.object({
                            inquiryDate: z4.string().optional().nullable(),
                            occurrences: z4.number().optional().nullable(),
                        })).optional().nullable(),
                    }).optional().nullable(),
                    summary: set_summary,
                }).optional().nullable(),
                stolenDocuments: z4.object({
                    stolenDocumentsResponse: z4.array(z4.object({
                        occurrenceDate: z4.string().optional().nullable(),
                        inclusionDate: z4.string().optional().nullable(),
                        documentType: z4.string().optional().nullable(),
                        documentNumber: z4.string().optional().nullable(),
                        issuingAuthority: z4.string().optional().nullable(),
                        detailedReason: z4.string().optional().nullable(),
                        occurrenceState: z4.string().optional().nullable(),
                        phoneNumber: z4.object({
                            regionCode: z4.number().optional().nullable(),
                            areaCode: z4.number().optional().nullable(),
                            phoneNumber: z4.number().optional().nullable(),
                            phoneType: z4.string().optional().nullable(),
                            phoneTypeCode: z4.number().optional().nullable(),
                            updateDate: z4.string().optional().nullable(),
                        }).optional().nullable(),
                    })).optional().nullable(),
                    summary: set_summary,
                }).optional().nullable(),
                spcInquires: z4.object({
                    spcInquiriesResponse: z4.array(z4.object({
                        daysQuantity: z4.number().optional().nullable(),
                        occurrenceDate: z4.string().optional().nullable(),
                        segmentDescription: z4.string().optional().nullable(),
                        companyName: z4.string().optional().nullable(),
                        companyDocumentId: z4.string().optional().nullable(),
                        companyAlias: z4.string().optional().nullable(),
                    })).optional().nullable(),
                    summary: set_summary,
                }).optional().nullable(),
                inquiriesSegments: z4.object({
                    inquiriesSegmentsResponse: z4.array(z4.object({
                        segmentDescription: z4.string().optional().nullable(),
                        occurrenceDate: z4.array(z4.string()).optional().nullable(),
                        total: z4.number().optional().nullable(),
                    })).optional().nullable(),
                    summary: set_summary,
                }).optional().nullable(),
                inquiriesSegmentsMonthly: z4.object({
                    message: z4.string().optional().nullable(),
                    inquiriesSegmentsMonthlyResponse: z4.array(z4.object({
                        segmentDescription: z4.string().optional().nullable(),
                        occurrenceDate: z4.array(z4.string()).optional().nullable(),
                        total: z4.number().optional().nullable(),
                    })).optional().nullable(),
                    summary: set_summary,
                }).optional().nullable(),
                spcInquiriesSegments: z4.object({
                    spcInquiriesSegmentsResponse: z4.array(z4.object({
                        segmentDescription: z4.string().optional().nullable(),
                        occurrenceDate: z4.array(z4.string()).optional().nullable(),
                        total: z4.number().optional().nullable(),
                    })).optional().nullable(),
                    summary: set_summary,
                }).optional().nullable(),
                judgementFilings: z4.object({
                    judgementFilingsResponse: z4.array(z4.object({
                        occurrenceDate: z4.string().optional().nullable(),
                        availabilityDate: z4.string().optional().nullable(),
                        legalSquare: z4.string().optional().nullable(),
                        legalNatureId: z4.string().optional().nullable(),
                        legalNature: z4.string().optional().nullable(),
                        civilCourt: z4.string().optional().nullable(),
                        principal: z4.boolean().optional().nullable(),
                        inclusionDate: z4.string().optional().nullable(),
                        flagSubJudice: z4.boolean().optional().nullable(),
                        caseNumber: z4.string().optional().nullable(),
                        amount: z4.number().optional().nullable(),
                        distributor: z4.string().optional().nullable(),
                        city: z4.string().optional().nullable(),
                        state: z4.string().optional().nullable(),
                        dispute: z4.object({
                            disputeIndicativeFlag: z4.boolean().optional().nullable(),
                            trialDate: z4.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional().nullable(),
                            civilCourtId: z4.string().optional().nullable(),
                            distributorId: z4.string().optional().nullable(),
                            trialSquareId: z4.string().optional().nullable(),
                            trialId: z4.string().optional().nullable(),
                            disputeMessagePt: z4.string().optional().nullable(),
                        }).optional().nullable(),
                    })).optional().nullable(),
                    summary: set_summary,
                }).optional().nullable(),
                bankrupts: z4.object({
                    bankruptsResponse: z4.array(z4.object({
                        occurrenceDate: z4.string().optional().nullable(),
                        availabilityDate: z4.string().optional().nullable(),
                        inclusionDate: z4.string().optional().nullable(),
                        legalNatureId: z4.string().optional().nullable(),
                        legalNature: z4.string().optional().nullable(),
                        caseNumber: z4.string().optional().nullable(),
                        companyDocumentId: z4.string().optional().nullable(),
                        companyName: z4.string().optional().nullable(),
                        positionCompany: z4.string().optional().nullable(),
                        city: z4.string().optional().nullable(),
                        state: z4.string().optional().nullable(),
                        civilCourt: z4.string().optional().nullable(),
                        typeOccurrence: z4.string().optional().nullable(),
                        legalSquare: z4.string().optional().nullable(),
                        companyLegalNatureID: z4.string().optional().nullable(),
                        companyLegalNature: z4.string().optional().nullable(),
                        dispute: z4.object({
                            disputeIndicativeFlag: z4.boolean().optional().nullable(),
                            trialDate: z4.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional().nullable(),
                            civilCourtId: z4.string().optional().nullable(),
                            distributorId: z4.string().optional().nullable(),
                            trialSquareId: z4.string().optional().nullable(),
                            trialId: z4.string().optional().nullable(),
                            disputeMessagePt: z4.string().optional().nullable(),
                        }).optional().nullable(),
                    })).optional().nullable(),
                    summary: set_summary,
                }).optional().nullable(),
                spcInquirySummary: z4.object({
                    spcInquiryQuantity: z4.object({
                        actual: z4.number().optional().nullable(),
                        creditInquiriesQuantity: z4.array(z4.object({
                            inquiryDate: z4.string().optional().nullable(),
                            occurrences: z4.number().optional().nullable(),
                        })).optional().nullable(),
                        checkInquiriesQuantity: z4.array(z4.object({
                            inquiryDate: z4.string().optional().nullable(),
                            occurrences: z4.number().optional().nullable(),
                        })).optional().nullable(),
                    }).optional().nullable(),
                    summary: set_summary,
                }).optional().nullable(),
            }).optional().nullable(),
            // score VISTORIADO OK
            score: z4.object({
                score: z4.number().min(0).optional().nullable(),
                scoreModel: z4.string().optional().nullable(),
                range: z4.string().optional().nullable(),
                defaultRate: z4.string().optional().nullable(),
                codeMessage: z4.number().int().optional().nullable(),
                message: z4.string().optional().nullable(),
            }).optional().nullable(),
            // scores VISTORIADO OK
            scores: z4.object({
                scoreResponse: z4.array(z4.object({
                    score: z4.number().optional().nullable(),
                    scoreModel: z4.string().optional().nullable(),
                    range: z4.string().optional().nullable(),
                    defaultRate: z4.string().optional().nullable(),
                    codeMessage: z4.number().optional().nullable(),
                    message: z4.string().optional().nullable(),
                })).optional().nullable(),
            }).optional().nullable(),
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
                            reports: z4.array(OutputSchemaSalvo),
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

        export type Input = z4.infer<typeof InputSchema>

        export type Output = z4.infer<typeof OutputSchema>
    }
}

export default ServicesAnalisando