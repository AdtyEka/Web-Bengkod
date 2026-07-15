<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Activity Report</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            font-size: 12px;
            color: #333;
        }
        .header {
            text-align: center;
            margin-bottom: 30px;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
            color: #2563eb;
        }
        .header p {
            margin: 5px 0 0 0;
            color: #666;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }
        th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
        }
        th {
            background-color: #f8fafc;
            font-weight: bold;
            color: #475569;
        }
        tr:nth-child(even) {
            background-color: #f8fafc;
        }
        .type-badge {
            padding: 3px 6px;
            border-radius: 4px;
            font-size: 10px;
            font-weight: bold;
            text-transform: uppercase;
        }
        .type-cv {
            background-color: #dbe1ff;
            color: #2563eb;
        }
        .type-interview {
            background-color: #e0f2fe;
            color: #0284c7;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>Activity Report</h1>
        <p>Generated on {{ now()->format('M d, Y H:i') }}</p>
        <p>
            Filter: 
            @if($range === '1d') Today 
            @elseif($range === '7d') Last 7 Days
            @elseif($range === '30d') Last 30 Days
            @else All History
            @endif
        </p>
    </div>

    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Type</th>
                <th>Target Role</th>
                <th>Company</th>
                <th>Result</th>
                <th>Date</th>
            </tr>
        </thead>
        <tbody>
            @forelse($activities as $activity)
                <tr>
                    <td>{{ $activity->id }}</td>
                    <td>
                        @if($activity->type === 'cv_match')
                            <span class="type-badge type-cv">CV Match</span>
                        @else
                            <span class="type-badge type-interview">Interview</span>
                        @endif
                    </td>
                    <td>{{ $activity->role }}</td>
                    <td>{{ $activity->company ?: '-' }}</td>
                    <td>
                        @if($activity->result_type === 'match')
                            Score: {{ $activity->match_value }}%
                        @elseif($activity->result_type === 'rating')
                            Rating: {{ $activity->rating_value }}/5
                        @else
                            -
                        @endif
                    </td>
                    <td>{{ $activity->created_at->format('Y-m-d H:i') }}</td>
                </tr>
            @empty
                <tr>
                    <td colspan="6" style="text-align: center;">No activities found for this period.</td>
                </tr>
            @endforelse
        </tbody>
    </table>
</body>
</html>
