import mongoose from 'mongoose';

const FeedBackSchema = new mongoose.Schema(
    {
        idDevice: {
            type: String,
            required: true,
            trim: true
        },
        idEdition: {
            type: String,
            required: true,
            trim: true
        },
        transportCode: {
            type: String,
            required: true,
            trim: true
        },
        typeRoute: {
            type: String,
            required: true,
            enum: ['FULL_ROUTE', 'PARTIAL_ROUTE'],
            default: 'FULL_ROUTE'
        },
        state: {
            type: String,
            required: false,
            enum: ['NOT_AVAILABLE', 'CHANGED', 'OTHERS'],
            default: 'OTHERS'
        },
        userLocation: {
            type: {
                lat: Number,
                lng: Number
            },
            required: false
        },
        description: {
            type: String,
            required: false,
            trim: true
        },
        phone: {
            type: String,
            require: false
        },
        segment: {
            type: {
                start: {
                    lat: Number,
                    lng: Number
                },
                end: {
                    lat: Number,
                    lng: Number
                }
            },
            require: false
        },
        segments: {
            type: [
                {
                    start: {
                        lat: Number,
                        lng: Number
                    },
                    end: {
                        lat: Number,
                        lng: Number
                    }
                }
            ],
            required: false

        }
    },
    { timestamps: true }
);

export { FeedBackSchema };