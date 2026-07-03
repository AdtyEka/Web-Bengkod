<?php

namespace App\Models;

use Database\Factories\ActivityFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property int $user_id
 * @property string $type
 * @property string $role
 * @property string|null $company
 * @property string $result_type
 * @property int|null $match_value
 * @property float|null $rating_value
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
#[Fillable(['user_id', 'type', 'role', 'company', 'result_type', 'match_value', 'rating_value'])]
class Activity extends Model
{
    /** @use HasFactory<ActivityFactory> */
    use HasFactory;

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Compute a human-readable result label.
     */
    public function getResultLabelAttribute(): string
    {
        if ($this->result_type === 'match' && $this->match_value !== null) {
            return "{$this->match_value}% Match";
        }

        if ($this->result_type === 'rating' && $this->rating_value !== null) {
            $label = $this->rating_value >= 4.0 ? 'High' : ($this->rating_value >= 3.0 ? 'Moderate' : 'Low');

            return "{$label} ({$this->rating_value}/5)";
        }

        return '—';
    }

    /**
     * Compute badge variant for the result.
     */
    public function getResultVariantAttribute(): string
    {
        if ($this->result_type === 'match' && $this->match_value !== null) {
            if ($this->match_value >= 85) {
                return 'success';
            }
            if ($this->match_value >= 70) {
                return 'warning';
            }

            return 'error';
        }

        if ($this->result_type === 'rating' && $this->rating_value !== null) {
            if ($this->rating_value >= 4.0) {
                return 'success';
            }
            if ($this->rating_value >= 3.0) {
                return 'warning';
            }

            return 'error';
        }

        return 'primary';
    }
}
