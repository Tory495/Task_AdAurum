<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CompanyRequest extends FormRequest
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
            'name' => 'required|string|max:255',
            'inn' => 'required|integer|unique:companies',
            'info' => 'required|string|max:255',
            'ceo' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'phone' => 'required|string|max:64',
        ];
    }
}
