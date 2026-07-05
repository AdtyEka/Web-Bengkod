<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('activities', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('type'); // 'cv_match' | 'interview_coach'
            $table->string('role'); // target job role
            $table->string('company')->nullable(); // for CV match
            $table->string('result_type'); // 'match' | 'rating'
            $table->unsignedTinyInteger('match_value')->nullable(); // 0-100
            $table->decimal('rating_value', 3, 1)->nullable(); // 0.0-5.0
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('activities');
    }
};
