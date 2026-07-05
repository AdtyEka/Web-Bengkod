export type ActivityType = 'CV Matcher' | 'Interview Coach';
export type FilterType = 'All' | 'CV Matches' | 'Interviews';

export interface Activity {
    id: number;
    type: ActivityType;
    role: string;
    date: string;
    time: string;
    resultType: 'match' | 'rating';
    matchValue?: number;
    ratingValue?: number;
}
