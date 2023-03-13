<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CommentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'commentary' => 'required|string|max:255',
            'field' => 'required|integer',
            'user_id' => 'required|integer',
            'company_id' => 'required|integer',
            'created_at' => 'required'
        ];
    }
}
