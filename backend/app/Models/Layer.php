<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Layer extends Model
{
    protected $table = 'layers';
    public $timestamps = true;
    protected $primaryKey = 'id';

    protected $fillable = ['name', 'geometry'];
    protected $casts = ['geometry' => 'array'];
}
