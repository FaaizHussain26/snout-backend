import mongoose, { Schema, Document, Types } from "mongoose";

export type SelectedService =
  | "drop_in"
  | "house_sitting"
  | "walks"
  | "pet_taxi";
export type AnimalType =
  | "dog"
  | "cat"
  | "farm_animal"
  | "bird"
  | "reptile"
  | "other_name";
export type DateType =
  | "30min"
  | "60min"
  | "house_sitting_start"
  | "house_sitting_end"
  | "pet_taxi";

export interface IPetInformation {
  animal_type: AnimalType | string;
  other_name?: string;
  quantity: number;
}

export interface ISelectedDate {
  type: DateType;
  datetime: Date;
}

export interface IContactDetails {
  name: string;
  phone_number: string;
  email: string;
}

export interface ILead extends Document<Types.ObjectId> {
  selected_service: SelectedService;
  pet_information: IPetInformation[];
  selected_dates: ISelectedDate[];
  address?: string;
  starting_point?: string;
  ending_point?: string;
  start_time?: string;
  end_time?: string;
  contact_details: IContactDetails;
  specific_note?: string;
  createdAt: Date;
  updatedAt: Date;
}

const PetInformationSchema = new Schema<IPetInformation>(
  {
    animal_type: {
      type: Schema.Types.String,
      required: true,
      enum: ["dog", "cat", "farm_animal", "bird", "reptile", "other_name"],
    },
    other_name: {
      type: Schema.Types.String,
      required: function (this: IPetInformation) {
        return this.animal_type === "other_name";
      },
      trim: true,
    },
    quantity: {
      type: Schema.Types.Number,
      required: true,
      min: 1,
    },
  },
  { _id: false }
);

const SelectedDateSchema = new Schema<ISelectedDate>(
  {
    type: {
      type: Schema.Types.String,
      required: true,
      enum: [
        "30min",
        "60min",
        "house_sitting_start",
        "house_sitting_end",
        "pet_taxi",
      ],
    },
    datetime: { type: Schema.Types.Date, required: true },
  },
  { _id: false }
);

const ContactDetailsSchema = new Schema<IContactDetails>(
  {
    name: { type: Schema.Types.String, required: true, trim: true },
    phone_number: { type: Schema.Types.String, required: true, trim: true },
    email: { type: Schema.Types.String, required: true, trim: true },
  },
  { _id: false }
);

const LeadSchema = new Schema<ILead>(
  {
    selected_service: {
      type: Schema.Types.String,
      required: true,
      enum: ["drop_in", "house_sitting", "walks", "pet_taxi"],
    },
    pet_information: {
      type: [PetInformationSchema],
      required: true,
      validate: (v: any) => Array.isArray(v) && v.length > 0,
    },
    selected_dates: {
      type: [SelectedDateSchema],
      required: true,
      validate: (v: any) => Array.isArray(v) && v.length > 0,
    },
    address: { type: Schema.Types.String, required: false, trim: true },
    starting_point: { type: Schema.Types.String, required: false, trim: true },
    ending_point: { type: Schema.Types.String, required: false, trim: true },
    start_time: { type: Schema.Types.String, required: false, trim: true },
    end_time: { type: Schema.Types.String, required: false, trim: true },
    contact_details: { type: ContactDetailsSchema, required: true },
    specific_note: { type: Schema.Types.String, required: false, trim: true },
  },
  { timestamps: true }
);

export const Lead = mongoose.model<ILead>("leads", LeadSchema);
