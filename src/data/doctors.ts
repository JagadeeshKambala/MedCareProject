export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  experience: number;
  qualifications: Array<{
    degree: string;
    institution: string;
    year: number;
  }>;
  email: string;
  phone: string;
  averageRating: number;
  totalReviews: number;
  availableSlots: Array<{
    day: string;
    startTime: string;
    endTime: string;
  }>;
}

export const doctors: Doctor[] = [
  {
    id: "1",
    name: "Dr.Sameer",
    specialty: "Cardiologist",
    experience: 10,
    qualifications: [
      { degree: "MD", institution: "Harvard Medical School", year: 2010 },
    ],
    email: "md.sameer0136@gmail.com",
    phone: "+91 9999999999",
    averageRating: 4.8,
    totalReviews: 124,
    availableSlots: [
      { day: "Monday", startTime: "09:00", endTime: "17:00" },
      { day: "Wednesday", startTime: "09:00", endTime: "17:00" },
    ],
  },
  {
    id: "2",
    name: "Dr.Narendra",
    specialty: "General Physician",
    experience: 8,
    qualifications: [
      { degree: "MD", institution: "Stanford Medical School", year: 2012 },
    ],
    email: "mandadanarendra77@gmail.com",
    phone: "+91 9999999999",
    averageRating: 4.6,
    totalReviews: 98,
    availableSlots: [
      { day: "Tuesday", startTime: "09:00", endTime: "17:00" },
      { day: "Thursday", startTime: "09:00", endTime: "17:00" },
    ],
  },
  {
    id: "3",
    name: "Dr.Ravi Sai Manikanta",
    specialty: "Pediatrician",
    experience: 12,
    qualifications: [
      { degree: "MD", institution: "Yale School of Medicine", year: 2008 },
    ],
    email: "ravikomaticerti@gmail.com",
    phone: "+91 9999999999",
    averageRating: 4.9,
    totalReviews: 156,
    availableSlots: [
      { day: "Monday", startTime: "08:00", endTime: "16:00" },
      { day: "Friday", startTime: "08:00", endTime: "16:00" },
    ],
  },
  {
    id: "4",
    name: "Dr.Sathvik",
    specialty: "Neurologist",
    experience: 15,
    qualifications: [
      {
        degree: "MD",
        institution: "Johns Hopkins School of Medicine",
        year: 2005,
      },
    ],
    email: "sathvikmathangii@gmail.com",
    phone: "+91 9999999999",
    averageRating: 4.7,
    totalReviews: 142,
    availableSlots: [
      { day: "Wednesday", startTime: "10:00", endTime: "18:00" },
      { day: "Friday", startTime: "10:00", endTime: "18:00" },
    ],
  },
  {
    id: "5",
    name: "Dr.Kishore",
    specialty: "Dermatologist",
    experience: 9,
    qualifications: [
      { degree: "MD", institution: "UCLA School of Medicine", year: 2011 },
    ],
    email: "middinakishoreyadav@gmail.com",
    phone: "+91 9999999999",
    averageRating: 4.5,
    totalReviews: 87,
    availableSlots: [
      { day: "Tuesday", startTime: "09:00", endTime: "17:00" },
      { day: "Thursday", startTime: "09:00", endTime: "17:00" },
    ],
  },
];
