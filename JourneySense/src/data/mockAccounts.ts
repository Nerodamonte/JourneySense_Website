export type RowRole = "User" | "Staff" | "Admin";
export type RowStatus = "Active" | "Suspended";

export interface UserRow {
  id: string;
  initials?: string;
  name: string;
  email: string;
  phone: string;
  role: RowRole;
  status: RowStatus;
  created: string;
}

export interface RecentJourney {
  route: string;
  date: string;
  category: string;
  stars: number;
}

export interface AccountDetailView {
  id: string;
  initials?: string;
  name: string;
  email: string;
  phone: string;
  role: RowRole;
  status: RowStatus;
  created: string;
  profileImageUrl: string;
  membershipPlan: string;
  pointsWallet: number;
  travelVibes: string[];
  journeyTotal: number;
  avgRating: string;
  pointsUsed: number;
  recentJourneys: RecentJourney[];
  accountCreatedLabel: string;
  lastLoginLabel: string;
  accountIdLabel: string;
}

export const MOCK_USERS: UserRow[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarahjohnson@email.com",
    phone: "+1 (555) 123-4567",
    role: "User",
    status: "Active",
    created: "Mar 12, 2025",
  },
  {
    id: "2",
    initials: "MC",
    name: "Michael Chen",
    email: "m.chen@email.com",
    phone: "+1 234 567 8902",
    role: "Staff",
    status: "Active",
    created: "Feb 28, 2025",
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    email: "e.rodriguez@email.com",
    phone: "+1 234 567 8903",
    role: "Admin",
    status: "Active",
    created: "Jan 08, 2025",
  },
  {
    id: "4",
    name: "James Williams",
    email: "j.williams@email.com",
    phone: "+1 234 567 8904",
    role: "User",
    status: "Suspended",
    created: "Dec 15, 2024",
  },
  {
    id: "5",
    initials: "AK",
    name: "Aisha Khan",
    email: "a.khan@email.com",
    phone: "+1 234 567 8905",
    role: "User",
    status: "Active",
    created: "Nov 02, 2024",
  },
];

const DEFAULT_AVATAR =
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=320&h=320&fit=crop&crop=face";

const DETAIL_EXTENSION: Record<string, Partial<AccountDetailView>> = {
  "1": {
    profileImageUrl:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face",
    membershipPlan: "30 Days Premium",
    pointsWallet: 2450,
    travelVibes: ["Adventure", "Nature", "Photography", "Cultural", "Relaxation"],
    journeyTotal: 24,
    avgRating: "4.8",
    pointsUsed: 1200,
    recentJourneys: [
      { route: "New York → San Francisco", date: "March 15, 2024", category: "Adventure", stars: 5 },
      { route: "Paris → Rome", date: "February 2, 2024", category: "Cultural", stars: 5 },
      { route: "Bali → Tokyo", date: "January 8, 2024", category: "Relaxation", stars: 4 },
    ],
    accountCreatedLabel: "January 10, 2024",
    lastLoginLabel: "March 18, 2024 at 10:34 PM",
    accountIdLabel: "USR-123-456-789",
  },
};

function defaultDetailFromRow(row: UserRow): AccountDetailView {
  return {
    ...row,
    profileImageUrl: DEFAULT_AVATAR,
    membershipPlan: "Free",
    pointsWallet: 0,
    travelVibes: ["Explorer"],
    journeyTotal: 0,
    avgRating: "—",
    pointsUsed: 0,
    recentJourneys: [],
    accountCreatedLabel: row.created,
    lastLoginLabel: "—",
    accountIdLabel: `USR-${row.id.padStart(3, "0")}-000-000`,
  };
}

export function getAccountDetailView(userId: string): AccountDetailView | null {
  const row = MOCK_USERS.find((u) => u.id === userId);
  if (!row) return null;
  const base = defaultDetailFromRow(row);
  const extra = DETAIL_EXTENSION[userId];
  return extra ? { ...base, ...extra } : base;
}
